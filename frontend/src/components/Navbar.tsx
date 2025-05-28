import { useLocation, useNavigate } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import TicketIcon from "./Icons/TicketIcon";
import BackpackIcon from "./Icons/BackpackIcon";
import PieChartIcon from "./Icons/PieChartIcon";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { label: "Dashboard", path: "/", icon: <PieChartIcon /> },
    { label: "Items", path: "/items", icon: <BackpackIcon /> },
    { label: "Tickets", path: "/tickets", icon: <TicketIcon /> },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        width: 250,
        p: 2,
        backgroundColor: "background.default",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "20%",
          textAlign: "center",
        }}
      >
        <Typography
          variant="h4"
          sx={{ fontSize: 32, fontWeight: "bold", color: "common.white" }}
        >
          Track
          <Box component="span" sx={{ color: "primary.main" }}>
            It
          </Box>
          Down
        </Typography>
        <Typography
          sx={{ fontWeight: 500, fontSize: 20, color: "common.white" }}
        >
          Lost & Found
        </Typography>
      </Box>

      {/* Navigation Links */}
      <Box
        sx={{
          flexGrow: 1,
          mt: 2,
          display: "flex",
          flexDirection: "column",
          gap: 1.5,
        }}
      >
        {navItems.map(({ label, path, icon }) => (
          <Box key={label}>
            <NavButton
              label={label}
              icon={icon}
              active={location.pathname === path}
              onClick={() => navigate(path)}
            />
            {label === "Items" && location.pathname === "/items" && (
              <NavButton
                label="New Item"
                onClick={() =>
                  navigate("/items", { state: { openNewItemModal: true } })
                }
                isSubItem
              />
            )}
          </Box>
        ))}
      </Box>

      {/* Footer */}
      <Box mt="auto" py={2} textAlign="center">
        <Typography variant="caption" color="text.secondary">
          Footer
        </Typography>
      </Box>
    </Box>
  );
}

interface NavButtonProps {
  label: string;
  icon?: JSX.Element;
  active?: boolean;
  onClick: () => void;
  isSubItem?: boolean;
}

function NavButton({
  label,
  icon,
  active = false,
  onClick,
  isSubItem = false,
}: NavButtonProps) {
  const buttonStyles = {
    justifyContent: "flex-start",
    py: 1.5,
    px: 2,
    fontSize: isSubItem ? 15 : 16,
    textTransform: "none",
    color: "common.white",
    backgroundColor: active ? "primary.main" : "#222d31",
    mt: isSubItem ? 1 : 0,
    "&:hover": {
      backgroundColor: "primary.dark",
    },
  };

  return (
    <Button onClick={onClick} startIcon={icon} fullWidth sx={buttonStyles}>
      {label}
    </Button>
  );
}

export default Navbar;
