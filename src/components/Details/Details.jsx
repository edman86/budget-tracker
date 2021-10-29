import React from 'react';
import { Card, CardHeader, CardContent, Typography } from '@mui/material';
import { Doughnut } from 'react-chartjs-2';
import useTransactions from '../../useTransactions';

import useStyles from './DetailStyles';

const Details = ({ title }) => {
    
    const styles = useStyles();
    const { total, chartData } = useTransactions(title);
    
    const initialChart = {
        datasets: [{
            data: [100],
            backgroundColor: '#edeef0' 
        }],
        labels: ['No transactions']
    };
    
    return (
        <Card sx={styles[title.toLowerCase()]}>
            <CardHeader title={title} />
            <CardContent>
                <Typography variant="h5" component="h5">
                    {`$${total}`}
                </Typography>
                <Doughnut data={chartData.datasets[0].data.length ? chartData : initialChart} />
            </CardContent>
        </Card>
    );
};

export default Details;