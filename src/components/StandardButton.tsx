import React from "react";

type Props = {
  onClick: () => void;
  buttonText: string;
  buttonColor?: string;
};

const StandardButton = ({ onClick, buttonText, buttonColor }: Props) => {
  console.log(buttonText, buttonColor);
  return (
    <button
      className={` mx-6 my-4 grid gap-2 self-center rounded-md border border-secondary ${
        buttonColor ? `bg-${String(buttonColor)}` : "bg-secondary"
      } px-6 py-4`}
      onClick={onClick}
    >
      {buttonText}
    </button>
  );
};

export default StandardButton;
