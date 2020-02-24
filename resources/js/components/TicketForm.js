import React, { Component } from "react";

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { withStyles } from "@material-ui/core/styles";

import { ticketcontroller } from '../controllers/TicketController';

const useStyles = theme => ({
    submit: {
        margin: theme.spacing(3, 0, 2)
    }
});

class TicketForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ticket_descripcion: ''
        };

        this.handleTicketDescriptionChange = this.handleTicketDescriptionChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleTicketDescriptionChange(event) {
        this.setState({ticket_descripcion: event.target.value});
    }

    async handleSubmit(e){
        e.preventDefault();

        let ticketData = {
            ticket_pedido: this.state.ticket_descripcion
        }

        await ticketcontroller.createTicket(ticketData)
                            .then(result => {
                                location.reload();
                            })
                            .catch(error => {
                                this.setState(error)})
                            .finally(error => {
                                this.setState(error)})
    }

    render() {
        const { classes } = this.props;

        return (
            <form>
                <TextField
                    id="outlined-multiline-static"
                    label="Indique la descripción de su ticket"
                    multiline
                    rows="8"
                    fullWidth={true}
                    onChange={this.handleTicketDescriptionChange}
                    value={this.props.ticket_descripcion}
                    variant="outlined"
                />

                <Button variant="contained" color="primary" className={classes.submit} onClick={this.handleSubmit}>
                    Guardar
                </Button>
            </form>
        );
    }
}

export default withStyles(useStyles)(TicketForm);
