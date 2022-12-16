import { Link, useNavigate } from "@remix-run/react";
import { config } from "~/lib/config";
import { SerializeDate } from "~/types/SerializeDate";
import { User } from "~/types/User";
import { Button } from "../FormElements/Button";

interface Props {
  user?: SerializeDate<User>;
}

export default function Header({ user }: Props) {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };

  return user ? (
    <header className="border-b-[1px] border-purple-700 p-8 pb-2">
      <div className="w-full relative flex items-center justify-around">
        <Link to="/" className="cursor-pointer">
          <h1 className="w-full mb-4 font-black text-5xl text-center font-heading">
            {config.appName}
          </h1>
        </Link>
        <Button
          color="secondary"
          onClick={handleLogout}
          className="flex items-center justify-center w-[fit-content] px-4 rounded-full absolute left-0 text-lg"
        >
          Logout
        </Button>
      </div>
    </header>
  ) : (
    <header className="border-b-[1px] border-purple-700 p-8 pb-2">
      <Link to="/" className="cursor-pointer">
        <h1 className="w-full mb-4 font-black text-5xl text-center font-heading">
          {config.appName}
        </h1>
      </Link>
    </header>
  );
}
