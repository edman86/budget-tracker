import React from 'react';
import { Card, CardContent, Typography, Grid, Chip, Divider } from '@mui/material';

import List from '../List/List';

import useStyles from './MainStyles';


const Main = () => {
    const styles = useStyles();

    return (
        <Card>
            <CardContent>
                <Typography
                    variant="h5"
                    align="center"
                    component="h5"
                >
                    Transactions
                </Typography>
            </CardContent>

            <Divider />

            <CardContent sx={styles.cartContent}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <List />
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default Main;