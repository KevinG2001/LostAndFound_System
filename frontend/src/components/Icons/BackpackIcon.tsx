const BackpackIcon = ({ width = 24, height = 24, color = "currentColor" }) => (
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
    <path d="M8 3v2a4 4 0 0 0 8 0V3" />
    <path d="M6 7h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2z" />
    <path d="M10 13h4" />
  </svg>
);

export default BackpackIcon;
