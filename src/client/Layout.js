const { createMuiTheme } = require("@material-ui/core/styles");
const { ThemeProvider } = require("@material-ui/styles");
const Nav = require("./Nav");

const Layout = (children) => (
    <ThemeProvider theme={createMuiTheme({palette: {type: 'dark'}})}>
        <Nav />
        {children}
    </ThemeProvider>
);

exports.default = Layout;