import { Box, Typography } from "@mui/material";
import { SxProps, Theme } from "@mui/system";

interface StatBubbleProps {
  title: string;
  value: string | number;
  icon: React.ElementType;
  iconColor?: string;
  iconSx?: SxProps<Theme>;
}

const StatBubble = ({
  title,
  value,
  icon: Icon,
  iconColor = "primary.main",
  iconSx,
}: StatBubbleProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        gap: 2,
        p: 2,
        width: "100%",
        height: "100%",
        minHeight: 96,
      }}
    >
      {/* Icon */}
      <Box
        component={Icon}
        sx={{
          width: 48,
          height: 48,
          color: iconColor,
          ...iconSx,
        }}
      />

      {/* Text */}
      <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
        <Typography
          variant="subtitle2"
          color="text.secondary"
          noWrap
          sx={{ lineHeight: 1.2 }}
        >
          {title}
        </Typography>
        <Typography
          variant="h5"
          fontWeight="bold"
          sx={{ lineHeight: 1.3, mt: 0.5 }}
        >
          {value}
        </Typography>
      </Box>
    </Box>
  );
};

export default StatBubble;
