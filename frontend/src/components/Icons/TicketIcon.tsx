const TicketIcon = ({
  width = 24,
  height = 24,
  color = "currentColor",
  strokeWidth = 2,
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 9V7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v2"></path>
    <path d="M21 15v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2"></path>
    <path d="M7 9v6"></path>
    <path d="M17 9v6"></path>
    <path d="M3 12h18"></path>
  </svg>
);

export default TicketIcon;
