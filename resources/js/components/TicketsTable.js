import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";

import {
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    InputLabel,
    MenuItem,
    FormControl,
    Select,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle
} from "@material-ui/core";

import { ticketcontroller } from "../controllers/TicketController";
import { userscontroller } from "../controllers/UserController";

const useStyles = theme => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white
    },

    table: {
        minWidth: 650
    },

    button: {
        margin: theme.spacing(1)
    },

    formControl: {
        margin: theme.spacing(1),
        minWidth: 500
    }
});

class Tickets extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ticket_id: null,
            tickets: [],
            users: [],
            open: false,
            user_asig: {}
        };

        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleUserChange = this.handleUserChange.bind(this);
        this.handleSaveAsign = this.handleSaveAsign.bind(this);
    }

    async componentWillMount() {
        this.fillTicketsData();
        this.fillUsersData();
    }

    handleClickOpen(e) {
        this.setState({
            open: true,
            ticket_id: e.id
        });
    }

    handleClose() {
        this.setState({
            open: false
        });
    }

    handleChangeTicket(e) {
        console.log(e);
    }

    async handleSaveAsign() {
        let ticket_id = this.state.ticket_id;

        let data = {
            assigned_user_id: this.state.user_asig
        };

        await ticketcontroller
            .updateTicket(ticket_id, data)
            .then(response => {
                this.fillTicketsData();
            })
            .catch(error => {
                this.setState({
                    tickets: []
                });
            });

        this.handleClose();
    }

    handleUserChange(event) {
        console.log(event);
        this.setState({ user_asig: event.target.value });
    }

    async fillTicketsData() {
        await ticketcontroller
            .getTickets()
            .then(tickets => {
                this.setState({
                    tickets
                });
            })
            .catch(error => {
                this.setState({
                    tickets: []
                });
            });
    }

    async fillUsersData() {
        await userscontroller
            .getUsers()
            .then(users => {
                this.setState({
                    users
                });
            })
            .catch(error => {
                this.setState({
                    users: []
                });
            });
    }

    render() {
        const { classes } = this.props;

        return (
            <TableContainer component={Paper}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Enviado Por:</TableCell>
                            <TableCell>Asignado a:</TableCell>
                            <TableCell>Fecha</TableCell>
                            <TableCell>Ticket</TableCell>
                            <TableCell align="right">Asignar</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.tickets.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell>{row.user.name}</TableCell>
                                <TableCell>
                                    {row.asignado ? row.asignado.name : "N/A"}
                                </TableCell>
                                <TableCell>{row.created_at}</TableCell>
                                <TableCell>{row.ticket_pedido}</TableCell>
                                <TableCell align="right">
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        size="small"
                                        className={classes.button}
                                        onClick={() => this.handleClickOpen(row)}
                                    >
                                        Asignar
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <Dialog
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                    open={this.state.open}
                    maxWidth="sm"
                    fullWidth={true}
                >
                    <DialogTitle
                        id="customized-dialog-title"
                        onClose={this.handleClose}
                    >
                        Modal title
                    </DialogTitle>
                    <DialogContent dividers>

                        <form className={classes.container}>
                            <FormControl className={classes.formControl}>
                                <InputLabel id="users-select-label">
                                    Usuario a asignar:
                            </InputLabel>
                                <Select
                                    labelId="users-select-label"
                                    id="users-select-label"
                                    value={this.state.user_asig}
                                    onChange={this.handleUserChange}
                                    fullWidth
                                >
                                    {this.state.users.map((row, index) => (
                                        <MenuItem key={index} value={row.id}>{row.name}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            autoFocus
                            onClick={this.handleSaveAsign}
                            color="primary"
                        >
                            Asignar
                        </Button>
                    </DialogActions>
                </Dialog>
            </TableContainer>
        );
    }
}

export default withStyles(useStyles)(Tickets);
