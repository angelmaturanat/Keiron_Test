import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import { withStyles } from "@material-ui/core/styles";
import FlashMessage from 'react-flash-message';
import Alert from "@material-ui/lab/Alert";

import {
    Avatar,
    Button,
    CssBaseline,
    TextField,
    Typography,
    Container
} from "@material-ui/core";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import blueGrey from "@material-ui/core/colors/blueGrey";

import { authcontroller } from '../controllers/AuthController';

const useStyles = theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: blueGrey["500"]
    },
    form: {
        width: "100%",
        marginTop: theme.spacing(1)
    },
    submit: {
        margin: theme.spacing(3, 0, 2)
    }
});

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false,
            error: "",
            formSubmitting: false,
            user: {
                email: "",
                password: ""
            },
            redirect: props.redirect
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
    }

    componentWillMount() {
        let state = localStorage["appState"];
        if (state) {
            let AppState = JSON.parse(state);
            this.setState({ isLoggedIn: AppState.isLoggedIn, user: AppState });
        }
    }

    componentDidMount() {
        let perfil = this.state.user.user.tipo_user_id;

        if(perfil == 1){
            const { prevLocation } = this.state.redirect.state || {
                prevLocation: { pathname: "/admin" }
            };

            if (prevLocation && this.state.isLoggedIn) {
                return this.props.history.push(prevLocation);
            }
        }else if(perfil == 2){
            const { prevLocation } = this.state.redirect.state || {
                prevLocation: { pathname: "/user" }
            };

            if (prevLocation && this.state.isLoggedIn) {
                return this.props.history.push(prevLocation);
            }
        }
    }

    async handleSubmit(e) {
        e.preventDefault();
        this.setState({ formSubmitting: true });
        let userData = this.state.user;

        await authcontroller.login(userData)
                            .then(result => {
                                this.setState(result);
                                location.reload();
                            })
                            .catch(error => {
                                this.setState(error)})
                            .finally(error => {
                                this.setState(error)})
    }

    handleEmail(e) {
        let value = e.target.value;
        this.setState(prevState => ({
            user: {
                ...prevState.user,
                email: value
            }
        }));
    }

    handlePassword(e) {
        let value = e.target.value;
        this.setState(prevState => ({
            user: {
                ...prevState.user,
                password: value
            }
        }));
    }

    render() {
        const { classes } = this.props;

        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <AssignmentIndIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Mesa de Ayuda
                    </Typography>

                    {this.state.isLoggedIn ? 
                        <FlashMessage duration={60000} persistOnHover={true}>
                            <Alert severity="success">Login Exitoso!</Alert>
                        </FlashMessage> : ''}

                    {this.state.error ? 
                        <FlashMessage duration={60000} persistOnHover={true}>
                            <Alert severity="error">Ha ocurrido un problema, favor reintentar.</Alert>
                        </FlashMessage> : ''}

                    <form className={classes.form} noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email"
                            name="email"
                            autoComplete="email"
                            required onChange={this.handleEmail}
                            autoFocus
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Contraseña"
                            type="password"
                            id="password"
                            required onChange={this.handlePassword}
                            autoComplete="current-password"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="secondary"
                            onClick={this.handleSubmit}
                            className={classes.submit}
                        >
                            Ingresar
                        </Button>
                    </form>
                </div>
            </Container>
        );
    }
}

export default withStyles(useStyles)(withRouter(Login));
