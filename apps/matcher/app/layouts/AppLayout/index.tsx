import { PropsWithChildren } from "react";
import Header from "~/components/Header";
import { User } from "~/types/User";

export const AppLayout = ({
  children,
  user,
}: PropsWithChildren<{ user?: User }>) => {
  return (
    <div className="bg-purple-800 w-full relative text-purple-300 px-0 md:p-8 md:pt-0 pt-0 min-h-[100vh] h-full ">
      <div className="flex p-0 flex-col max-w-4xl w-full mx-auto sticky top-8 bg-purple-800 border-r-[1px] border-l-[1px] border-purple-700 min-h-[100vh]">
        <Header user={user} />
        {children}
      </div>
    </div>
  );
};
