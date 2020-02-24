import React, { Component } from "react";
import { withRouter } from "react-router-dom";
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

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isRegistered: false,
            error: "",
            formSubmitting: false,
            user: {
                name: "",
                email: "",
                password: "",
                repite_password: ""
            },
            redirect: props.redirect
        };

        this.handleName = this.handleName.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleRepitePassword = this.handleRepitePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(e) {
        e.preventDefault();
        this.setState({ formSubmitting: true });
        let userData = this.state.user;

        await authcontroller.register(userData)
            .then(result => {
                this.setState(result);
                location.reload();
            })
            .catch(error => {
                this.setState(error)
            });
    }

    handleName(e) {
        let value = e.target.value;
        this.setState(prevState => ({
            user: {
                ...prevState.user,
                name: value
            }
        }));
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

    handleRepitePassword(e) {
        let value = e.target.value;
        this.setState(prevState => ({
            user: {
                ...prevState.user,
                repite_password: value
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

                    {this.state.isRegistered ? 
                        <FlashMessage duration={60000} persistOnHover={true}>
                            <Alert severity="success">Registro Exitoso!</Alert>
                        </FlashMessage> : ''}

                    {this.state.error ? 
                        <FlashMessage duration={60000} persistOnHover={true}>
                            <Alert severity="error">Ha ocurrido un problema, favor reintentar.</Alert>
                        </FlashMessage> : ''}

                    <form className={classes.form} noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required onChange={this.handleName}
                            fullWidth
                            id="name"
                            label="Nombre Completo"
                            name="name"
                            autoComplete="name"
                            autoFocus
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required onChange={this.handleEmail}
                            fullWidth
                            id="email"
                            label="Email"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required onChange={this.handlePassword}
                            fullWidth
                            name="password"
                            label="Contraseña"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required onChange={this.handleRepitePassword}
                            fullWidth
                            name="password"
                            label="Repita Contraseña"
                            type="password"
                            id="password"
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
                            Registrarme
                        </Button>
                    </form>
                </div>
            </Container>
        );
    }
}

export default withStyles(useStyles)(withRouter(Register));
