import { useEffect, useRef } from "react";
import { Choice } from "~/types/Choice";

interface Props {
  choice: Choice;
  totalVotes: number;
}

export const ChoiceResult = ({ choice, totalVotes }: Props) => {
  const percentageContainerRef = useRef<HTMLDivElement>(null);

  const sizeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (choice && sizeRef.current) {
      sizeRef.current.style.width = `${(
        (choice.votes / totalVotes) *
        100
      ).toFixed(0)}%`;
    }
  }, [choice, sizeRef]);

  return (
    <div
      ref={percentageContainerRef}
      key={choice.id}
      className="flex flex-row justify-start items-center w-full rounded-full relative border-[1px] border-solid border-gray-500"
    >
      <span className="px-8 w-full">
        {choice.description}: {choice.votes} (
        {((choice.votes / totalVotes) * 100).toFixed(2)}%)
      </span>
      <div
        ref={sizeRef}
        className={`h-full bg-blue-500 absolute w-[${(
          (choice.votes / totalVotes) *
          100
        ).toFixed(0)}%] opacity-30`}
      />
    </div>
  );
};
