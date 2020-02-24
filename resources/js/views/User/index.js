import React, { Component } from "react";
import {
    Box,
    Container,
    CssBaseline,
    ExpansionPanel,
    ExpansionPanelSummary,
    ExpansionPanelDetails,
    Typography,
    Badge
} from "@material-ui/core";

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import TicketsTable from '../../components/TicketsTableUser';
import TicketForm from '../../components/TicketForm';

class UserPage extends Component {
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
            <div>
                <Box component="span" m={1} >
                    <Typography variant="h5" component="h2" gutterBottom>
                        Crear solicitud de Ticket
                    </Typography>
                    <TicketForm />
                </Box>
                <Box component="span" m={3} >
                    <Typography variant="h5" component="h2" gutterBottom>
                            Listado de Tickets
                    </Typography>

                    <Container component="main" maxWidth="md">
                        <CssBaseline />
                        <ExpansionPanel>
                            <ExpansionPanelSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography>Tickets Asignados a mi:</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <TicketsTable />
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                        <ExpansionPanel>
                            <ExpansionPanelSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography>
                                    Tickets enviados por mi:
                                </Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <TicketsTable type="myTickets" />
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    </Container>
                </Box>
            </div>
        );
    }
}
export default UserPage;
