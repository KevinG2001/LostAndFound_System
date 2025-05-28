import useCount from "../../util/useCount";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import StatBubble from "./StatBubble";

function LostThisMonth() {
  const { counts } = useCount("items");

  return (
    <StatBubble
      title="Lost This Month"
      value={counts?.lostItemCount ?? "Loading..."}
      icon={CalendarMonthIcon}
      iconColor="error.main"
    />
  );
}

export default LostThisMonth;
