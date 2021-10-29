const contextReducer = (state, action) => {
    let transactions;
    
    switch (action.type) {
        case 'ADD_TRANSACTION':
            transactions = [...state, action.payload];
            localStorage.setItem('transactions', JSON.stringify(transactions));
            return transactions;
            
        case 'DELETE_TRANSACTION':
            transactions = state.filter(t => t.id !== action.payload);
            localStorage.setItem('transactions', JSON.stringify(transactions));
            return transactions;
        
        default:
            return state;        
    }
};

export default contextReducer;