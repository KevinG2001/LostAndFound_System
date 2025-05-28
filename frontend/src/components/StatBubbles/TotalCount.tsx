import useCount from "../../util/useCount";
import StatBubble from "./StatBubble";
import ItemIcon from "../../assets/itemIcon.svg?react";

function TotalCount() {
  const { counts } = useCount("items");

  return (
    <StatBubble
      title="Total Items Lost"
      value={counts?.totalCount ?? "Loading..."}
      icon={ItemIcon}
    />
  );
}

export default TotalCount;
