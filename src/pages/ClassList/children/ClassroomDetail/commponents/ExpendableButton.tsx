import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


interface ExpendableButtonProps {
  isOpen: boolean;
  toggle: () => void;
}

const ExpendableButton: React.FC<ExpendableButtonProps> = ({ isOpen, toggle }) => {
  return (
    <button onClick={toggle}>
      <span
        className={` ${isOpen ? 'rotate-180' : ''}`}
        style={{
          transition: 'transform 0.25s'
        }}
      >
      </span>
    </button>
  );
};

export default ExpendableButton
