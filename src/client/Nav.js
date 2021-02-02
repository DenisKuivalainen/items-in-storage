const { useRouter } = require("next/router");
const { concat, compose, map } = require("ramda");
const { Button, Grid } = require("@material-ui/core");
const { config } = require("../config");

const Header = (nav) => (
    <Grid container spacing={1} style={{ width: "100%" }}>
        {nav}
        <Grid item xs={6} />
    </Grid>
);

const NavButton = (category) => {
    const router = useRouter();
    var link = concat("/", category);

    return(
        <Grid item xs={2}>
            <Button 
                variant={router.pathname === link ? "contained" : "outlined"}
                style={{ width: "100%" }}
                onClick={() => router.push(link)}
            >
                {category}
            </Button>
        </Grid>
    );
}

const Head = compose(Header, map(NavButton))(config("categories"));

exports.default = Head;