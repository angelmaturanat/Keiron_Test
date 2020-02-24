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

        console.log(props.type);

        this.state = {
            tableType: props.type,
            ticket_id: null,
            tickets: []
        };
    }

    async componentWillMount() {
        this.fillTicketsData();
    }

    async fillTicketsData() {
        if (this.state.tableType === 'myTickets') {
            await ticketcontroller
                .getTicketsForMe()
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
        } else {
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
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    }
}

export default withStyles(useStyles)(Tickets);
