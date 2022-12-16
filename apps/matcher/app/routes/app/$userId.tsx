import { ActionFunction, json, LoaderFunction } from "@remix-run/node";
import { Form, useCatch, useLoaderData } from "@remix-run/react";
import { useEffect, useState } from "react";
import invariant from "tiny-invariant";
import { ZodError } from "zod";
import { Button } from "~/components/FormElements/Button";
import { AppLayout } from "~/layouts/AppLayout";
import { badRequest } from "~/lib/badRequest";
import { config } from "~/lib/config";
import { createLikes, getLikesByToOrFrom } from "~/models/likes.server.";
import { getAllUsers, getUser, requireUserId } from "~/models/users.server.";
import { LikeWithUsers } from "~/types/Like";
import { SerializeDate } from "~/types/SerializeDate";
import { User } from "~/types/User";

interface LoaderData {
  likes: LikeWithUsers[];
  likedBy: LikeWithUsers[];
  users: User[];
  currentUser: User;
}

export const loader: LoaderFunction = async ({ params, request }) => {
  invariant(params.userId);
  await requireUserId(request);

  const users = await getAllUsers();
  const currentUser = await getUser(params.userId);

  const likes = currentUser?.id
    ? await getLikesByToOrFrom({ from: currentUser.id })
    : [];

  const likedBy = currentUser?.id
    ? await getLikesByToOrFrom({ to: currentUser.id })
    : [];

  return {
    likedBy,
    likes,
    users,
    currentUser,
  };
};

export const action: ActionFunction = async ({ request, ...rest }) => {
  try {
    const userId = await requireUserId(request);
    const formData = await request.formData();
    const { from, ...likesObject } = Object.fromEntries(formData);
    const likeIds = Object.values(likesObject);

    const likes = likeIds.map((like) => ({
      to: like as string,
      from: userId,
    }));

    const result = await createLikes(likes);

    return json(result);
  } catch (error) {
    console.log("error:", error);
    return badRequest({
      formError:
        (error as ZodError).issues?.reduce(
          (acc, issue) => `${acc} ${issue.message}`.trim(),
          ""
        ) ?? `Something went wrong.`,
    });
  }
};

export default function Index() {
  const { users, currentUser, likes, likedBy } = useLoaderData<LoaderData>();

  const [genderFilteredUsers, setGenderFilteredUsers] = useState<
    SerializeDate<User>[]
  >([]);

  const [likesMap, setLikesMap] = useState<Record<string, SerializeDate<User>>>(
    {}
  );

  console.log("likesMap:", likesMap);

  const [likedByMap, setLikedByMap] = useState<
    Record<string, SerializeDate<User>>
  >({});

  console.log("likedByMap:", likedByMap);

  useEffect(() => {
    if (likes) {
      const map = likes.reduce<Record<string, SerializeDate<User>>>(
        (acc, like) => {
          acc[like.to.id as string] = like.to;
          return acc;
        },
        {}
      );

      setLikesMap(map);
    }
  }, [likes]);

  useEffect(() => {
    if (likedBy) {
      const map = likedBy.reduce<Record<string, SerializeDate<User>>>(
        (acc, like) => {
          acc[like.from.id as string] = like.from;
          return acc;
        },
        {}
      );

      setLikedByMap(map);
    }
  }, [likedBy]);

  useEffect(() => {
    if (users) {
      setGenderFilteredUsers(
        users
          .filter((user) => user.gender !== currentUser.gender)
          .filter((user) => {
            return !Boolean(likesMap[user.id as string]);
          })
      );
    }
  }, [likesMap, users]);

  return (
    <div className="p-8 flex flex-col items-center gap-4 mx-8">
      <h1>
        Welcome to {config.appName}, {currentUser.firstname}
      </h1>

      <p>
        The matcher concept is simple, just select the people you might fancy
        and want to get to know a little more from the list below and click
        submit. If they also like you, you'll both be notified. If not then
        nothing will happen. This will save you from shooting your shot where
        you're not wanted.
      </p>

      {likes.length ? (
        <div className="flex flex-col gap-4 w-full">
          <h2 className="text-xl font-bold">
            Here are the people you've liked:
          </h2>

          <ul className="flex flex-col gap-4">
            {likes?.map((like) => (
              <li key={like.id} className="flex gap-4">
                {`- ${like.to.firstname} ${like.to.lastname} (${
                  like.to.whatsapp_username
                }) ${
                  likedByMap[like.to.id as string]
                    ? "- MATCHED 🎉. Why don't you slide into their DMS and say hi."
                    : ""
                }`}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="flex flex-col gap-4 w-full">
        {genderFilteredUsers.length === 0 && (
          <div>
            Looks like there are no{" "}
            {currentUser.gender === "male" ? "female" : "male"}s who have
            registered yet. Share the link to get people to register.
          </div>
        )}

        {genderFilteredUsers.length ? (
          <>
            <h2 className="text-xl font-bold">
              Here are the people you have not liked
            </h2>
            <Form method="post" className="flex flex-col gap-4">
              <ul className="flex flex-col gap-4">
                {genderFilteredUsers.map((user) => (
                  <li key={user.id} className="flex gap-4">
                    <input
                      type="checkbox"
                      id={user.username}
                      name={user.username}
                      className="accent-purple-800"
                      value={user.id}
                    />
                    <label
                      htmlFor={user.username}
                    >{`${user.firstname} ${user.lastname} (${user.whatsapp_username})`}</label>
                  </li>
                ))}
              </ul>
              <Button type="submit" className="w-full">
                Submit
              </Button>
            </Form>
          </>
        ) : null}
      </div>
    </div>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);

  return (
    <AppLayout>
      <div className="flex flex-col gap-4 w-full max-w-4xl mx-auto z-10">
        <div>An unexpected error occurred: {error.message}</div>;
      </div>
    </AppLayout>
  );
}

export function CatchBoundary() {
  const caught = useCatch();

  if (caught.status === 404) {
    return <div>Not found</div>;
  }

  throw new Error(`Unexpected caught response with status: ${caught.status}`);
}
