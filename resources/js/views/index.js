import React, { Component } from "react";
import Alert from "@material-ui/lab/Alert";
import { Box, Container, CssBaseline } from "@material-ui/core";

class Home extends Component {
    constructor() {
        super();
        this.state = {
            isLoggedIn: false,
            user: {}
        };
    }
    // check if user is authenticated and storing authentication data as states if true
    componentWillMount() {
        let state = localStorage["appState"];
        if (state) {
            let AppState = JSON.parse(state);
            this.setState({
                isLoggedIn: AppState.isLoggedIn,
                user: AppState.user
            });
        }
    }

    render() {
        return (
            <Box component="span" m={1}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Alert severity="info">
                        Esta es la página principal de Mesa de Ayuda
                    </Alert>
                </Container>
            </Box>
        );
    }
}
export default Home;
