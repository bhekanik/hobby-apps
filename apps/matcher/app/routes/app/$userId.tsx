import { ActionFunction, json, LoaderFunction } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { useEffect, useState } from "react";
import invariant from "tiny-invariant";
import { ZodError } from "zod";
import { Button } from "~/components/FormElements/Button";
import { badRequest } from "~/lib/badRequest";
import { config } from "~/lib/config";
import { createLikes, getLikesByToOrFrom } from "~/models/likes.server.";
import { getAllUsers, getUser } from "~/models/users.server.";
import { LikeWithUsers } from "~/types/Like";
import { SerializeDate } from "~/types/SerializeDate";
import { User } from "~/types/User";

interface LoaderData {
  likes: LikeWithUsers[];
  users: User[];
  currentUser: User;
}

export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.userId);

  const users = await getAllUsers();
  const currentUser = await getUser(params.userId);

  const likes = currentUser?.id
    ? await getLikesByToOrFrom({ from: currentUser.id })
    : [];

  return {
    likes,
    users,
    currentUser,
  };
};

export const action: ActionFunction = async ({ request, ...rest }) => {
  try {
    const formData = await request.formData();
    const { from, ...likesObject } = Object.fromEntries(formData);
    const likeIds = Object.values(likesObject);
    const likes = likeIds.map((like) => ({
      to: like as string,
      from: from as string,
    }));

    const result = await createLikes(likes);

    return json(result);
  } catch (error) {
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
  const { users, currentUser, likes } = useLoaderData<LoaderData>();
  const [genderFilteredUsers, setGenderFilteredUsers] = useState<
    SerializeDate<User>[]
  >([]);

  useEffect(() => {
    if (users && likes) {
      console.log("users:", users);
      setGenderFilteredUsers(
        users
          .filter((user) => user.gender !== currentUser.gender)
          .filter((user) => {
            const found = Boolean(
              likes.find((like) => {
                return like.to.id === user.id;
              })
            );
            console.log("found:", found);
            return !found;
          })
      );
    }
  }, [users, likes]);

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

      <div className="flex flex-col gap-4 w-full">
        <h2 className="text-xl font-bold">Here are the people you've liked</h2>

        <ul className="flex flex-col gap-4">
          {likes?.map((like) => (
            <li key={like.id} className="flex gap-4">
              {`${like.to.firstname} ${like.to.lastname} (${like.to.whatsapp_username})`}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col gap-4 w-full">
        <h2 className="text-xl font-bold">
          Here are the people you have not liked
        </h2>
        {genderFilteredUsers.length === 0 && (
          <div>
            Looks like there are no{" "}
            {currentUser.gender === "male" ? "female" : "male"}s who have
            registered yet. Share the link to get people to register.
          </div>
        )}

        {genderFilteredUsers.length && (
          <Form method="post" className="flex flex-col gap-4">
            <ul className="flex flex-col gap-4">
              {genderFilteredUsers.map((user) => (
                <li key={user.id} className="flex gap-4">
                  <input
                    type="checkbox"
                    id={user.username}
                    name={user.username}
                    className="accent-gray-800"
                    value={user.id}
                  />
                  <label
                    htmlFor={user.username}
                  >{`${user.firstname} ${user.lastname} (${user.whatsapp_username})`}</label>
                </li>
              ))}
            </ul>
            <input type="hidden" name="from" value={currentUser.id} />
            <Button type="submit" className="w-full">
              Submit
            </Button>
          </Form>
        )}
      </div>
    </div>
  );
}
