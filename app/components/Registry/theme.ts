import { PaletteMode } from "@mui/material";

interface AppTheme {
    mode?: PaletteMode;
}

export const generateThemeOptions = (appTheme: AppTheme): any => {
    const mode = appTheme.mode || "light";
    // const primaryColor = "#003049";
    // const secondaryColor = "#669bbc";
    // const primaryColor = "#4338ca";
    // const primaryColor = "#05668d";
    // const secondaryColor = "#05668d";
    const primaryColor = "#000000";
    const secondaryColor = "#000000";
    const backgroundColor = mode === "light" ? "#ffffff" : "#010101";
    const cardBackgroundColor = mode === "light" ? "#f2f2f2" : "#272727";

    return {
        palette: {
            mode: mode,
            primary: {
                main: primaryColor,
            },
            secondary: {
                main: secondaryColor,
            },
            background: {
                default: backgroundColor,
            },
        },
        typography: {
            // fontFamily: ["Montserrat"],
            fontFamily: ["open sans"],
            overflow: 'hidden',
            body1: {
                fontWeight: 500,
                noWrap: true,
                textOverflow: "ellipsis",
            },
            body2: {
                fontWeight: 500,
                noWrap: true,
                textOverflow: "ellipsis",
            },
        },
        
        components: {
            MuiTypography: {
                styleOverrides: {
                    root: {
                        overflow: 'hidden'
                    },
                },
            },
            MuiCssBaseline: {
                styleOverrides: {
                    body: {
                        scrollbarColor: "#dadada",
                        "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
                            backgroundColor: "#dadada",
                            width: "6px",
                        },
                        "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
                            borderRadius: 8,
                            backgroundColor: "#A7A7A7",
                            border: "3px solid #A7A7A7",
                        },
                        "&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus":
                        {
                            backgroundColor: "#A7A7A7",
                        },
                        "&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active":
                        {
                            backgroundColor: "#A7A7A7",
                        },
                        "&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover":
                        {
                            backgroundColor: "#A7A7A7",
                        },
                        "&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner": {
                            backgroundColor: "#dadada",
                        },
                    },
                },
            },
            MuiCard: {
                styleOverrides: {
                    root: {
                        backgroundColor: cardBackgroundColor,
                        backgroundImage: "none",
                    },
                },
            },
            MuiButton: {
                styleOverrides: {
                    root: {
                        fontWeight: "600",
                        textTransform: "capitalize",
                        "&.MuiButton-containedSecondary:hover": {
                            backgroundColor: '#fafafa',
                        },
                        "&.MuiButton-containedPrimary:hover": {
                            backgroundColor: '#333',
                        },
                    },
                },
            },
            MuiPaper  : {
                styleOverrides: {
                    root: {
                        backgroundColor:'#f6f5f4'
                    },
                },
            },
            MuiIconButton : {
                styleOverrides: {
                    root: {
                        color: primaryColor,
                        '&:hover' : {
                            backgroundColor:'#f6f5f4'
                        }
                    },
                },
            }
        },
    };
};
