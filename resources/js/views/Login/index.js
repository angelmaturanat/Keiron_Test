import React, { Component } from "react";
import { Box } from "@material-ui/core";
import LoginForm from '../../components/LoginForm';
import {withRouter} from "react-router-dom";

class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
          redirect: props.location,
        };
    }

    render() {
        return (
            <Box component="span" m={1}>
                <LoginForm redirect={this.state.redirect}/>
            </Box>
        );
    }
}

export default withRouter(LoginPage)
