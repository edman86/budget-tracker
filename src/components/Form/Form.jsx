import { useState, useContext, useEffect } from "react";
import { ExpenseTrackerContext } from "../../context/context";
import {
    TextField,
    Typography,
    Grid,
    Divider,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from "@mui/material";
import { PushToTalkButton, PushToTalkButtonContainer, ErrorPanel } from '@speechly/react-ui';
import { v4 as uuidv4 } from 'uuid';
import { incomeCategories, expenseCategories } from '../../constants/categories';
import { useSpeechContext } from "@speechly/react-client";
import createDate from '../../utils/createDate';
import formatDate from '../../utils/formatDate';


const initialState = {
    amount: '',
    category: '',
    type: '',
    date: '',
    details: ''
};

const Form = ({ setErrorSnackbarOpen, setSuccessSnackbarOpen }) => {
    const [formData, setFormData] = useState(initialState);
    const { addTransaction } = useContext(ExpenseTrackerContext);
    const { segment } = useSpeechContext();

    const createTransaction = () => {

        if (!formData.type || !formData.category || !formData.amount) {
            setErrorSnackbarOpen(true);
            return;
        }

        const transaction = {
            ...formData,
            amount: Number(formData.amount),
            id: uuidv4()
        }

        addTransaction(transaction);
        setSuccessSnackbarOpen(true);
        setFormData(initialState);
    };

    const selectedCategories = formData.type === "Income" ? incomeCategories : expenseCategories;

    useEffect(() => {
        if (segment) {
            if (segment.intent.intent === 'add_expense') {
                setFormData({ ...formData, type: 'Expense' });
            } else if (segment.intent.intent === 'add_income') {
                setFormData({ ...formData, type: 'Income' });
            } else if (segment.isFinal && segment.intent.intent === "create_transaction") {
                createTransaction();
            } else if (segment.isFinal && segment.intent.intent === "cancel_transaction") {
                return setFormData(initialState);
            }

            segment.entities.forEach(e => {
                const category = `${e.value.charAt(0).toUpperCase()}${e.value.slice(1).toLocaleLowerCase()}`

                switch (e.type) {
                    case 'amount':
                        setFormData({ ...formData, amount: e.value });
                        break;
                    case 'category':
                        if (incomeCategories.map(iC => iC.type).includes(category)) {
                            setFormData({ ...formData, type: 'Income', category: category });
                        } else if (expenseCategories.map(eC => eC.type).includes(category)) {
                            setFormData({ ...formData, type: 'Expense', category: category });
                        }
                        break;
                    case 'date':
                        setFormData({ ...formData, date: e.value });
                        break;
                    default:
                        break;
                }
            });

            if (segment.isFinal
                && formData.amount
                && formData.category
                && formData.type
                && formData.date) {
                createTransaction();
            }
        }
    }, [segment]);
    
    return (
        <Grid container spacing={2}>

            <Grid item xs={12}>
                <Typography 
                    variant="subtitle1"
                    align="center"
                    sx={{lineHeight: '1.5', mt: '1em', fontWeight: 'bold'}}
                >
                    To add transaction with vois:
                </Typography>
                
                <Typography 
                    variant="subtitle1"
                    align="center"
                    sx={{lineHeight: '1.5'}}
                >
                    Push the michrofon button and try saying for example: 
                </Typography>
                
                <Typography 
                    variant="subtitle1"
                    align="center"
                    sx={{lineHeight: '1.5', mb: '1em', fontStyle: 'italic'}}
                >
                    "Add income for $100 in Category Salary for Monday" 
                </Typography>
            </Grid>

            <Grid item xs={12}>
                <Divider sx={{mb: '1em'}} />
                <Typography align="center" variant="subtitle2" gutterBottom>
                    {segment && (
                        <>
                            {segment.words.map(word => word.value).join(" ")}
                        </>
                    )}
                </Typography>
            </Grid>
            <Grid item xs={6} md={6}>
                <FormControl variant="standard" fullWidth>
                    <InputLabel>Type</InputLabel>
                    <Select
                        value={formData.type}
                        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    >
                        <MenuItem value="Income">Income</MenuItem>
                        <MenuItem value="Expense">Expense</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={6} md={6}>
                <FormControl variant="standard" fullWidth>
                    <InputLabel>Category</InputLabel>
                    <Select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    >
                        {selectedCategories.map(category => (
                            <MenuItem key={category.type} value={category.type}>
                                {category.type}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={6} md={6}>
                <TextField
                    type="number"
                    label="Amount"
                    variant="standard"
                    fullWidth
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                />
            </Grid>
            <Grid item xs={6} md={6}>
                <TextField
                    type="date"
                    label="Date"
                    variant="standard"
                    fullWidth
                    value={formatDate(formData.date)}
                    onChange={(e) => setFormData({ ...formData, date: createDate(e.target.value) })}
                />
            </Grid>

            <Grid item xs={12} md={12}>
                <TextField
                    type="text"
                    label="Details"
                    variant="standard"
                    fullWidth
                    value={formData.details}
                    onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                />
            </Grid>

            <Grid item xs={12} sx={{m: '1.5em 0 2em'}}>
                <Button
                    variant="outlined"
                    color="primary"
                    fullWidth
                    onClick={createTransaction}
                >
                    Create
                </Button>
            </Grid>

            <PushToTalkButtonContainer>
                <PushToTalkButton />
                <ErrorPanel />
            </PushToTalkButtonContainer>
        </Grid>
    );
};

export default Form;