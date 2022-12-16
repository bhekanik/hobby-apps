import { ActionFunction } from "@remix-run/node";
import { Form, Link, useActionData, useCatch } from "@remix-run/react";
import { useEffect, useState } from "react";
import { ZodError } from "zod";
import { Button } from "~/components/FormElements/Button";
import { Input } from "~/components/FormElements/Input";
import { AppLayout } from "~/layouts/AppLayout";
import { badRequest } from "~/lib/badRequest";
import { config } from "~/lib/config";
import { colorsOnly } from "~/lib/theme/colors";
import { createUserSession, register } from "~/models/users.server.";
import { User } from "~/types/User";

export const action: ActionFunction = async ({ request }) => {
  try {
    const formData = await request.formData();
    const {
      username: username_form_value,
      password: password_form_value,
      confirm_password: confirm_password_form_value,
      firstname: firstname_form_value,
      gender: gender_form_value,
      lastname: lastname_form_value,
      whatsapp_username: whatsapp_username_form_value,
    } = Object.fromEntries(formData);

    const password = (password_form_value as string).trim();
    const confirm_password = (confirm_password_form_value as string).trim();

    if (password !== confirm_password) {
      return badRequest({
        formError: `Passwords don't match.`,
        fields: [
          { name: "password", content: "Passwords do not match" },
          { name: "confirm_password", content: "Passwords do not match" },
        ],
      });
    }

    const username = (username_form_value as string).trim().toLowerCase();
    const firstname = (firstname_form_value as string).trim();
    const lastname = (lastname_form_value as string).trim();
    const gender = (gender_form_value as string).trim() as User["gender"];
    const whatsapp_username = (whatsapp_username_form_value as string).trim();

    const user = await register({
      username,
      password,
      firstname,
      gender,
      lastname,
      whatsapp_username,
    });

    if (!user) {
      return badRequest({
        formError: `Something went wrong trying to create a new user.`,
      });
    }

    return createUserSession(user.id, `/app/${user.id}`);
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
  const actionData = useActionData();
  const [error, setError] = useState("");

  useEffect(() => {
    if (actionData?.formError) {
      setError(actionData.formError);
    }
  }, [actionData]);

  return (
    <div className="p-8 flex flex-col items-center gap-4 mx-8">
      <h1>Welcome to {config.appName}</h1>

      <h2>Register to start</h2>

      <Form
        className="flex flex-col gap-4 items-center w-full md:px-12"
        method="post"
      >
        <Input
          required
          placeholder="Username"
          name="username"
          className="text-center"
        />
        <fieldset className="flex flex-col md:flex-row gap-4 w-full">
          <Input
            required
            placeholder="First Name"
            name="firstname"
            className="text-center"
          />
          <Input
            required
            placeholder="Last Name"
            name="lastname"
            className="text-center"
          />
        </fieldset>
        <fieldset className="flex md:flex-row flex-col gap-4 w-full">
          <Input
            required
            placeholder="Whatsapp Username"
            name="whatsapp_username"
            className="text-center w-full"
          />

          <div className="flex flex-row gap-2 justify-center items-center">
            <label className="flex flex-row gap-2 justify-center items-center">
              <input
                type="radio"
                name="gender"
                value="male"
                defaultChecked
                className="accent-purple-800"
              />
              Male
            </label>
            <label className="flex flex-row gap-2 justify-center items-center">
              <input
                type="radio"
                name="gender"
                value="female"
                className="accent-purple-800"
              />
              Female
            </label>
          </div>
        </fieldset>
        <Input
          required
          type="password"
          placeholder="Password"
          name="password"
          className="text-center"
        />
        <Input
          required
          type="password"
          placeholder="Confirm Password"
          name="confirm_password"
          className="text-center"
        />
        {error && (
          <p className="text-red-500 bg-red-700 bg-opacity-20 px-8 w-full text-center py-2 rounded-full">
            {error}
          </p>
        )}
        <Button type="submit" className="px-4 w-full">
          Register
        </Button>
        <p>Already have an account?</p>
        <Link
          to="/login"
          className={`text-${colorsOnly.accent}-500 px-4 w-full text-center underline`}
        >
          Login
        </Link>
      </Form>
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
