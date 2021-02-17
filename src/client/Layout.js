import React from 'react';
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import Nav from "./Nav";
import { config } from "../config";
import { useClientHeight } from "../ClientHeight";

const Layout = ({ children }) => (
    <ThemeProvider theme={createMuiTheme({palette: {type: 'dark'}})}>
        <div className="index wrapper" style={{height: useClientHeight(20)}}>
            {Nav(config("categories"))}
            {children}
        </div>
    </ThemeProvider>
);

export default Layout;