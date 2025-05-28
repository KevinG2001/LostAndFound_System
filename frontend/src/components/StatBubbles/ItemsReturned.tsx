import useCount from "../../util/useCount";
import ReplayIcon from "@mui/icons-material/Replay";
import StatBubble from "./StatBubble";

function ItemsReturned() {
  const { counts } = useCount("items");

  return (
    <StatBubble
      title="Items Returned"
      value={counts?.returnedCount ?? "Loading..."}
      icon={ReplayIcon}
      iconColor="success.main"
    />
  );
}

export default ItemsReturned;
