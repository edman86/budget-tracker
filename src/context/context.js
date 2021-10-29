import React, { useReducer, createContext } from 'react';
import contextReducer from './contextReducer';


const initialState = JSON.parse(localStorage.getItem('transactions')) || [];

export const ExpenseTrackerContext = createContext(initialState);

export const Provider = ({ children }) => {
    const [transactions, dispatch] = useReducer(contextReducer, initialState);

    // Action Creators
    
    const addTransaction = (transaction) => {
        dispatch({type: 'ADD_TRANSACTION', payload: transaction});
    };

    const deleteTransaction = (id) => {
        dispatch({type: 'DELETE_TRANSACTION', payload: id});
    };

    const balance = transactions.reduce((acc, currentVal) => {
        return (currentVal.type === 'Expense' ? 
            acc - currentVal.amount : acc + currentVal.amount)
    }, 0);
    
    return (
        <ExpenseTrackerContext.Provider value={{
            transactions,
            addTransaction,
            deleteTransaction,
            balance
        }}>
            {children}
        </ExpenseTrackerContext.Provider>
    );
};