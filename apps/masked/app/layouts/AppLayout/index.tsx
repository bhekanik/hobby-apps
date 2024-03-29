import { PropsWithChildren } from "react";

export const AppLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="bg-gray-800 w-full relative text-gray-300 px-0 md:p-8 md:pt-0 pt-0 min-h-[100vh] h-full ">
      <div className="flex p-0 flex-col max-w-4xl w-full mx-auto sticky top-8 bg-gray-800 border-r-[1px] border-l-[1px] border-gray-700 min-h-[100vh]">
        {children}
      </div>
    </div>
  );
};
