import { ActionFunction } from "@remix-run/node";
import { Form, Link, useActionData, useCatch } from "@remix-run/react";
import { useEffect, useState } from "react";
import { ZodError } from "zod";
import { Button } from "~/components/FormElements/Button";
import { Input } from "~/components/FormElements/Input";
import { AppLayout } from "~/layouts/AppLayout";
import { badRequest } from "~/lib/badRequest";
import { config } from "~/lib/config";
import { createUserSession, login } from "~/models/users.server.";

export const action: ActionFunction = async ({ request }) => {
  try {
    const formData = await request.formData();
    const { username: username_form_value, password: password_form_value } =
      Object.fromEntries(formData);

    const username = (username_form_value as string).trim().toLowerCase();
    const password = (password_form_value as string).trim();

    const user = await login(username, password);

    if (!user) {
      return badRequest({
        formError: `Username/Password combination is incorrect`,
      });
    }

    if (user?.id) {
      return createUserSession(user.id, `/app/${user.id}`);
    }

    throw new Error("Something went wrong. Please try again.");
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

      <h2>Login to start</h2>

      <Form
        className="flex flex-col gap-4 items-center w-full px-12"
        method="post"
      >
        <Input
          required
          placeholder="Username"
          name="username"
          className="text-center"
        />
        <Input
          type="password"
          placeholder="Password"
          name="password"
          className="text-center"
        />
        {error && (
          <p className="text-red-500 bg-red-700 bg-opacity-20 px-8 w-full text-center py-2 rounded-full">
            {error}
          </p>
        )}
        <Button type="submit" className="px-4 w-full">
          Login
        </Button>
        <p>Don't have an account?</p>
        <Link to="/" className="px-4 w-full text-center underline">
          Register
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
