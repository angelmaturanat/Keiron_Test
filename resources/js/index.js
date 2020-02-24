import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import Router from "./router/index";

import NavBar from "./components/Header";
import { Container, Toolbar } from "@material-ui/core";

class Index extends Component {
    render() {
        return (
            <BrowserRouter>
                <NavBar />


                <Container>
                    <Route component={Router} />
                </Container>
            </BrowserRouter>
        );
    }
}

ReactDOM.render(<Index />, document.getElementById("index"));
