import { Grid, Chip } from "@mui/material";


const Filter = ({ filters, setFilters }) => {
    
    const handleClick = (filterType) => {
        const updatedFilters = filters.map(filter => {
            if (filter.type === filterType) {
                return {
                    ...filter,
                    active: !filter.active
                };
            } else {
                return filter;
            } 
        })

        setFilters(updatedFilters);
    };

    return (
        <>
            <Grid container spacing={1} justifyContent="center" sx={{mt: 1, pb: 1}}>
                {filters.map(filter => {
                    
                    return !filter.active ? (
                        <Grid item key={filter.id}>
                            <Chip label={filter.type} variant="outlined" onClick={ () => handleClick(filter.type) } />
                        </Grid>
                    ) : (
                        <Grid item key={filter.id}>
                            <Chip label={filter.type} onDelete={ () => handleClick(filter.type) } />
                        </Grid>
                    )
                    
                })}
                
            </Grid>
        </>

    );
};

export default Filter;