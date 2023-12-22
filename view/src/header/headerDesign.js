import { createTheme } from "@mui/material";

export const theme = createTheme({
    components: {
        MuiBox: {
            styleOverrides: {
                root: {
                    backgroundColor: "black"
                }
            }
        }
    }
});