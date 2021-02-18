import React from 'react';
import Link from "next/link";
import { useRouter } from "next/router";
import { concat, compose, map } from "ramda";
import { Button, Grid } from "@material-ui/core";

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
            <Link href={link} passHref>
                <Button 
                    variant={router.asPath === link || router.asPath === "/categories" + link ? "contained" : "outlined"}
                    style={{ width: "100%" }}
                >
                    {category}
                </Button>
            </Link>
        </Grid>
    );
}

const Head = compose(Header, map(NavButton));

export default Head;