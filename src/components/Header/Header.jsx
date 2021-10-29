import { AppBar, Toolbar, Typography, Grid, Container } from "@mui/material";

const Header = () => {
    return (
        <AppBar sx={{py: '0.5em'}} position="static">
            <Container maxWidth="lg">
                <Toolbar>
                    <Grid 
                        container
                        direction="column"
                        alignItems="flex-start"
                    >
                        <Grid item>
                            <Typography variant="h4">
                                Budget Tracker
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="subtitle2">
                                Powered by Speechly
                            </Typography>
                        </Grid>
                    </Grid>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Header;