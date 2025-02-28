const PieChartIcon = ({ width = 24, height = 24, color = "currentColor" }) => (
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
    {/* Pie chart circle */}
    <circle cx="12" cy="12" r="10" />

    {/* Slice cut */}
    <path d="M12 2v10l8.66 5" />
  </svg>
);

export default PieChartIcon;
