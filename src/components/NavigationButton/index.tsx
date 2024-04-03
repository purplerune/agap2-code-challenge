import React from "react";

interface NavigationButtonProps {
  direction: "left" | "right";
  onClick: () => void;
}
/**
 * This component renders the Navigation Buttons
 *
 * @param {string} direction Arrow direction
 * @param {function} onClick Function responsible for the onClick
 * @returns {ReactNode} A React element that renders the Navigation Button
 */
const NavigationButton: React.FC<NavigationButtonProps> = ({
  direction,
  onClick,
}) => {
  const arrowSvg =
    direction === "left" ? (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M15 19l-7-7 7-7"
        />
      </svg>
    ) : (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9 5l7 7-7 7"
        />
      </svg>
    );

  return (
    <button
      type="button"
      className="flex items-center justify-center text-gray-400 transition-all duration-200 bg-transparent border border-gray-300 rounded w-9 h-9 hover:bg-blue-600 hover:text-white focus:bg-blue-600 focus:text-white"
      onClick={onClick}
    >
      {arrowSvg}
    </button>
  );
};

export default NavigationButton;
