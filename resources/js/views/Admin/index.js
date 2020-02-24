import React, { Component } from "react";
import { Box, Container, CssBaseline } from "@material-ui/core";

import TicketTable from '../../components/TicketsTable';

class AdminiPage extends Component {
    constructor() {
        super();
        this.state = {
            isLoggedIn: false,
            user: {}
        };
    }

    render() {
        return (
            <Box component="span" m={1}>
                <Container component="main" maxWidth="md">
                    <CssBaseline />
                    <TicketTable/>
                </Container>
            </Box>
        );
    }
}
export default AdminiPage;
