import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { red, green } from '@mui/material/colors';
import formatDate from '../../utils/formatDate';


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
};

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};

export default function TransactionDialog({ open, setOpen, transactionData }) {

    const { amount, category, type, date, details } = transactionData;

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <BootstrapDialogTitle 
                    id="customized-dialog-title" 
                    onClose={handleClose} 
                    sx={{
                        borderBottom: `10px solid ${type === "Income" ? green[300] : red[300]}`
                    }}
                >
                    {`${type} Transaction`}
                </BootstrapDialogTitle>
                <DialogContent dividers sx={{minWidth: '400px'}}>
                    <Typography gutterBottom>
                        {`Type: ${type}`}
                    </Typography>
                    <Typography gutterBottom>
                        {`Category: ${category}`}   
                    </Typography>
                    <Typography gutterBottom>
                        {`Date: ${formatDate(date)}`}
                    </Typography>
                    <Typography gutterBottom>
                        {`Amount: $${amount}`}
                    </Typography>
                    <Typography gutterBottom>
                        {`Details: ${details}`}
                    </Typography>
                </DialogContent>
            </BootstrapDialog>
        </div>
    );
}