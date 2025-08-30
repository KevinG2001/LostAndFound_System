const BoxIcon = ({ width = 24, height = 24, color = "currentColor" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 8l9-5 9 5v8l-9 5-9-5V8z" />
    <path d="M21 8l-9 5L3 8" />
    <path d="M12 13v9" />
  </svg>
);

export default BoxIcon;
