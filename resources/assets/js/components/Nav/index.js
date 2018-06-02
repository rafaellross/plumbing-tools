import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { withRouter } from 'react-router-dom'

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import orange from '@material-ui/core/colors/orange';
import green from '@material-ui/core/colors/green';


const classes = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: orange,
    secondary: green,
  },
  status: {
    danger: 'orange',
  },
});


class Nav extends Component {

  constructor(props){
      super(props);
  }

  logout(e){
       e.preventDefault();
       axios.post('api/logout')
          .then(response=> {
            this.props.history.push('/');
          })
          .catch(error=> {
            console.log(error);
          });
  }

  handleClick(e){

    e.preventDefault();
    this.props.history.push('/login');

  }
  render() {

    if (this.props.link) {
      return (
      <MuiThemeProvider theme={theme}>
        <div className={classes.root}>
             <AppBar position="static">
               <Toolbar>
                 <IconButton style={classes.menuButton} color="inherit" aria-label="Menu">
                   <MenuIcon />
                 </IconButton>
                 <Typography variant="title" color="inherit" style={classes.flex}>
                   {this.props.title}
                 </Typography>
                 <Button color="inherit" onClick={this.logout.bind(this)} component={Link} to="/">{this.props.link}</Button>
               </Toolbar>
             </AppBar>
           </div>
       </MuiThemeProvider>
        )
    }
    return (
      <MuiThemeProvider theme={theme}>
        <div className={classes.root}>
             <AppBar position="static">
               <Toolbar>
                 <IconButton style={classes.menuButton} color="inherit" aria-label="Menu">
                   <MenuIcon />
                 </IconButton>
                 <Typography variant="title" color="inherit" style={classes.flex}>
                   {this.props.title}
                 </Typography>
                 <Button color="inherit" onClick={this.handleClick.bind(this)} component={Link} to="/">Login</Button>
               </Toolbar>
             </AppBar>
           </div>
       </MuiThemeProvider>
    )
  }

}

export default  withRouter(Nav)
