import { useContext } from 'react';
import { ExpenseTrackerContext } from '../../context/context';
import { Card, CardContent, Typography } from '@mui/material';


const InfoBalance = () => {
    const { balance } = useContext(ExpenseTrackerContext);
    
    return (
        <Card variant="outlined">
            <CardContent>
                <Typography 
                    align="center"
                    variant="h5"
                    component="div"
                >
                    <Typography variant="h5" component="h5">Total Balance</Typography>
                    <Typography variant="h5" component="h5" sx={{fontWeight: 'bold'}}>{`$${balance}`}</Typography>
                </Typography>
            </CardContent>
        </Card>
    );
};

export default InfoBalance;