import React from 'react';
import { Typography } from '@material-ui/core';

export default () => (
    <div style={{paddingTop: 100, marginLeft: 30, marginRight: 30, width: "100%", color: "white"}}>
        <Typography variant="h4" color="secondary">
            Welcome!
        </Typography>
        <Typography variant="h6">
            It is my solution for assignment brief for junior developers in Reaktor.
        </Typography>
        <Typography variant="h6">
            This website displays information about items in stock. The data is displayed in three categories: jackets, shirts, and accessories. Use the navigation bar above to browse through each category. To update data, click the icon to the right of the navigation bar.
        </Typography>
        <Typography variant="h6">
            To get started, select one of the three categories suggested above.
        </Typography>
    </div>
);