import React from "react";
import Tooltip from "../reusable/Tooltip";

type ActionButtonsProps = {
  actions: {
    name: string;
    icon: React.ReactNode;
    tip: string;
    onClick?: () => void; // onClick is optional
  }[];
};

const ActionButtons: React.FC<ActionButtonsProps> = ({ actions }) => {
  return (
    <div className="flex space-x-1">
      {actions.map((action) => (
        <Tooltip tooltip={action.tip} position="top" key={action.name}>
          <button
            onClick={action.onClick || (() => {})} // Provide a default no-op function
            className="p-1 rounded-full hover:bg-gray-200 transition-colors duration-200 flex items-center justify-center"
            aria-label={action.name}
            disabled={!action.onClick} // Disable button if onClick is undefined
          >
            {action.icon}
          </button>
        </Tooltip>
      ))}
    </div>
  );
};

export default ActionButtons;
