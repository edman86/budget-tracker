import { useEffect, useRef, useState, useContext } from 'react';
import { ExpenseTrackerContext } from './context/context';
import Header from './components/Header/Header';
import Details from './components/Details/Details';
import Main from './components/Main/Main';
import InfoBalance from './components/InfoBalance/InfoBalance';
import Form from './components/Form/Form';
import { styled, Container, Grid, Fab, Dialog, DialogContent, Snackbar, Alert } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { SpeechState, useSpeechContext } from '@speechly/react-client';


const StyledFab = styled(Fab)({
    position: 'fixed',
    zIndex: 10,
    left: 'auto',
    right: 100,
    bottom: 100,
});


function App() {
    const [isFormOpen, setFormOpen] = useState(false);
    const [isErrorSnackbarOpen, setErrorSnackbarOpen] = useState(false);
    const [isSuccessSnackbarOpen, setSuccessSnackbarOpen] = useState(false);
    const { speechState } = useSpeechContext();
    const { transactions } = useContext(ExpenseTrackerContext);
    const main = useRef(null);

    const executeScroll = () => main.current.scrollIntoView();

    const handleFabClick = () => {
        setFormOpen(true);
    };
    const handleFabClose = () => {
        setFormOpen(false);
    };

    useEffect(() => {
        if (speechState === SpeechState.Recording) {
            executeScroll();
        }
    }, [speechState]);

    useEffect(() => {
        setFormOpen(false);
    }, [transactions]);

    return (
        <div>
            <Header />
            <Container maxWidth="lg">
                <Grid
                    container
                    spacing={2}
                    justifyContent="center"
                    sx={{ mt: '2em' }}
                >
                    <Grid item xs={12} sm={6} md={4} sx={{ order: { xs: 1, md: 0 } }}>
                        <Details title={"Income"} />
                    </Grid>
                    <Grid ref={main} item xs={12} sm={12} md={4} sx={{ order: { xs: 0, md: 1 } }}>

                        <Grid container spacing={2} direction="column">
                            <Grid item>
                                <InfoBalance />
                            </Grid>
                            <Grid item>
                                <Main />
                            </Grid>
                        </Grid>

                    </Grid>
                    <Grid item xs={12} sm={6} md={4} sx={{ order: { xs: 2, md: 2 } }}>
                        <Details title={"Expense"} />
                    </Grid>
                </Grid>

                <StyledFab
                    color="primary"
                    aria-label="add"
                    sx={{
                        right: { xs: 50, md: 100 },
                        bottom: { xs: 50, md: 100 }
                    }}
                    onClick={handleFabClick}
                >
                    <AddIcon />
                </StyledFab>

            </Container>
            
            <Snackbar
                open={isErrorSnackbarOpen}
                autoHideDuration={3000}
                onClose={() => setErrorSnackbarOpen(false)}
            >
                <Alert severity="error" variant="filled">All fields must be filled!</Alert>
            </Snackbar>

            <Snackbar
                open={isSuccessSnackbarOpen}
                autoHideDuration={3000}
                onClose={() => setSuccessSnackbarOpen(false)}
            >
                <Alert severity="success" variant="filled">Transaction successfully created.</Alert>
            </Snackbar>
            
            <Dialog maxWidth="xs" open={isFormOpen} onClose={handleFabClose}>
                <DialogContent>
                    <Form 
                        setErrorSnackbarOpen={setErrorSnackbarOpen} 
                        setSuccessSnackbarOpen={setSuccessSnackbarOpen}
                    />
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default App;