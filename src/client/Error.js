import React from 'react';
import { Typography } from '@material-ui/core';

const Error = (message) => (
    <div style={{paddingTop: 100, width: '100%', textAlign: 'center'}}>
        <Typography variant="h4" color="error">
            {message}
        </Typography>
    </div>
);

export default Error;