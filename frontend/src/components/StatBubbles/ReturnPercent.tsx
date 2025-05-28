import useCount from "../../util/useCount";
import StatBubble from "./StatBubble";
import ReturnIcon from "../../assets/returnIcon.svg?react";

function ReturnPercent() {
  const { counts } = useCount("items");

  const total = counts?.totalCount ?? 0;
  const returned = counts?.returnedCount ?? 0;
  const returnPercentage =
    total > 0 ? `${((returned / total) * 100).toFixed(1)}%` : "Loading...";

  return (
    <StatBubble
      title="Return Rate"
      value={returnPercentage}
      icon={ReturnIcon}
    />
  );
}

export default ReturnPercent;
