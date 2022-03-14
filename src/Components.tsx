import { HTMLProps } from "react";

export const Button: React.FC & Button = (props) => (
  <button
    {...props}
    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
  >
    {props.children}
  </button>
);
