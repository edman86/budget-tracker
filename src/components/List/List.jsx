import { useState, useContext } from 'react';
import {
    List as MUIList,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Avatar,
    ListItemSecondaryAction,
    IconButton,
    Slide,
} from '@mui/material';

import { red } from '@mui/material/colors';
import { green } from '@mui/material/colors';

import { Delete, AttachMoney, MoneyOff } from '@mui/icons-material';
import { ExpenseTrackerContext } from '../../context/context';

import TransactionDialog from '../TransactionDialog/TransactionDialog';

import sortDate from '../../utils/sortDate';
import formatDate from '../../utils/formatDate';
import filterTransactions from '../../utils/filterTransactions';
import Filter from '../Filter/Filter';
import { filtersData } from "../../constants/filters";


const List = () => {
    const { transactions, deleteTransaction } = useContext(ExpenseTrackerContext);
    const [isTransactionOpen, setTransactionOpen] = useState(false);
    const [transactionData, setTransactionData] = useState({
        id: 1,
        amount: '',
        category: '',
        type: '',
        date: new Date()
    });
    const [filters, setFilters] = useState(filtersData);

    const handleItemClick = (value) => {
        setTransactionOpen(true);
        setTransactionData(value);
        console.log(value);
    }

    const filteredTransactions = filterTransactions(transactions, filters);
    const sortedTransactions = sortDate(filteredTransactions);

    return (
        <>
            <div>
                <Filter filters={filters} setFilters={setFilters} />
            </div>

            <MUIList
                dense={false}
                sx={{ maxHeight: '300px', overflow: 'auto' }}
            >
                {sortedTransactions.map((transaction) => (
                    <Slide
                        direction="down"
                        in
                        mountOnEnter
                        unmountOnExit
                        key={transaction.id}
                    >
                        <ListItem button key={transaction.id} onClick={() => handleItemClick(transaction)}>
                            <ListItemAvatar>
                                <Avatar sx={{ backgroundColor: transaction.type === "Income" ? green[500] : red[500] }}>
                                    {transaction.type === "Income" ? <AttachMoney /> : <MoneyOff />}
                                </Avatar>
                            </ListItemAvatar>

                            <ListItemText
                                primary={transaction.category}
                                secondary={`$${transaction.amount} - ${formatDate(transaction.date)}`}
                            />

                            <ListItemSecondaryAction>
                                <IconButton
                                    edge="end"
                                    aria-label="delete"
                                    onClick={() => deleteTransaction(transaction.id)}
                                >
                                    <Delete />
                                </IconButton>
                            </ListItemSecondaryAction>

                        </ListItem>
                    </Slide>
                ))}
            </MUIList>

            <TransactionDialog
                open={isTransactionOpen}
                setOpen={setTransactionOpen}
                transactionData={transactionData}
            />

        </>
    );
};

export default List;