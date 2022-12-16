import { ActionFunction, redirect } from "@remix-run/node";
import { Form, Link } from "@remix-run/react";
import { ZodError } from "zod";
import { Button } from "~/components/FormElements/Button";
import { Input } from "~/components/FormElements/Input";
import Header from "~/components/Header";
import { badRequest } from "~/lib/badRequest";
import { config } from "~/lib/config";
import { login } from "~/models/users.server.";

export const action: ActionFunction = async ({ request }) => {
  try {
    const formData = await request.formData();
    const { username: username_form_value, password: password_form_value } =
      Object.fromEntries(formData);

    const username = (username_form_value as string).trim().toLowerCase();
    const password = (password_form_value as string).trim();

    const result = await login(username, password);

    if (result?.id) {
      return redirect(`/app/${result.id}`);
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
  return (
    <>
      <Header />
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
          <Button type="submit" className="px-4 w-full">
            Login
          </Button>
          <p>Don't have an account?</p>
          <Link to="/" className="px-4 w-full text-center underline">
            Register
          </Link>
        </Form>
      </div>
    </>
  );
}
