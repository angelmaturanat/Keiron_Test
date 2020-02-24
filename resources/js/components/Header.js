import React, { Component }  from 'react';
import { Link } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { authcontroller } from '../controllers/AuthController';

const useStyles = theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
});

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false,
            error: "",
            user: {},
            redirect: props.redirect
        };

        this.handleLogout = this.handleLogout.bind(this);
    }

    componentWillMount() {
        let state = localStorage["appState"];
        if (state) {
            let AppState = JSON.parse(state);
            this.setState({ isLoggedIn: AppState.isLoggedIn, user: AppState });
        }

        console.log(state);
    }

    handleLogout(){
        authcontroller.logout();
        location.reload();
    }

    render() {
        const { classes } = this.props;
        let isLoggedIn = this.state.isLoggedIn;

        if(isLoggedIn){
            return (
                <div className={classes.root}>
                  <AppBar position="static">
                    <Toolbar>
                      {/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon />
                      </IconButton> */}
                      <Typography variant="h6" className={classes.title}>
                        Mesa de Ayuda
                      </Typography>
                      <Button color="inherit" onClick={this.handleLogout}>Cerrar Sesión</Button>
                    </Toolbar>
                  </AppBar>
                </div>
              );
        }else{
            return (
                <div className={classes.root}>
                  <AppBar position="static">
                    <Toolbar>
                      {/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon />
                      </IconButton> */}
                      <Typography variant="h6" className={classes.title}>
                        Mesa de Ayuda
                      </Typography>
                      <Button color="inherit" component={Link} to={'/login'}>Login</Button>
                      <Button color="inherit" component={Link} to={'/register'}>Registro</Button>
                    </Toolbar>
                  </AppBar>
                </div>
              );
        }
    }
}

export default withStyles(useStyles)(Navbar);
