import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText("#000000"),
  backgroundColor: "#000000",
  "&:hover": {
    backgroundColor: "#eeeeee",
  },
}));

export default ColorButton;
