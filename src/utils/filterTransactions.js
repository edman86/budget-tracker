export default function filterTransactions(transactions, filters) {
    const activeFilters = filters.map(filter => filter.active ? filter.type : null)

    let filteredTransactions = [...transactions];

    if (activeFilters.includes('Today')) {
        const today = new Date();
        const day = today.getDate();
        const month = today.getMonth();
        const year = today.getFullYear();
        const currentDate = new Date(year, month, day);

        const todayFilter = filteredTransactions.filter(transaction => {
            const transactionDate = new Date(transaction.date);
            const day = transactionDate.getDate();
            const month = transactionDate.getMonth();
            const year = transactionDate.getFullYear();

            return new Date(year, month, day).getTime() === currentDate.getTime();
        })

        filteredTransactions = [...todayFilter];

    } else if (activeFilters.includes('Current week')) {
        const today = new Date();
        const currentDate = today.getDate();
        let dayOfWeek = today.getDay();
        if (dayOfWeek === 0) {
            dayOfWeek = 7;
        }
        const firstDayOfCurrentWeek = currentDate - (dayOfWeek - 1);
        const lastDayOfCurrentWeek = firstDayOfCurrentWeek + 7;
        
        const currentWeekFilter = filteredTransactions.filter(transaction => {
            return (
                new Date(transaction.date).getTime() 
                >= 
                new Date(today.getFullYear(), today.getMonth(), firstDayOfCurrentWeek).getTime()
                &&
                new Date(transaction.date).getTime()
                <=
                new Date(today.getFullYear(), today.getMonth(), lastDayOfCurrentWeek).getTime()        
            )    
        });

        filteredTransactions = [...currentWeekFilter];
    } else if (activeFilters.includes('Current month')) {
        const today = new Date();
        const currentMonth = today.getMonth();
        const currentYear = today.getFullYear();

        const currentMonthFilter = filteredTransactions.filter(transaction => {
            return (
                new Date(transaction.date).getMonth() === currentMonth
                &&
                new Date(transaction.date).getFullYear() === currentYear
            )
        });

        filteredTransactions = [...currentMonthFilter];
    }

    if (activeFilters.includes('Only Income')) {
        const onlyIncomeFilter = filteredTransactions.filter(transaction => {
            return transaction.type === 'Income';
        });

        filteredTransactions = [...onlyIncomeFilter];

    } else if (activeFilters.includes('Only Expense')) {
        const onlyExpenseFilter = filteredTransactions.filter(transaction => {
            return transaction.type === 'Expense';
        });
        
        filteredTransactions = [...onlyExpenseFilter];
    }

    return filteredTransactions;

}