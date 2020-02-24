import React, { Component } from "react";
import { Box } from "@material-ui/core";
import RegisterForm from '../../components/RegisterForm';

class RegisterPage extends Component {
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
                <RegisterForm/>
            </Box>
        );
    }
}

export default RegisterPage;
