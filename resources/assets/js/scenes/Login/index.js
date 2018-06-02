import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import Typography from '@material-ui/core/Typography';
import logo from '../../../static/logo.svg';

const classes = {
  root: {
    backgroundColor: '#ED7F00',
    height: '100vh'

  },
  card: {
     maxWidth: 645,
     marginTop: 60
   },
   media: {
      height: 130,
    },
    button: {
        marginTop: 20,
    },
};


class Login extends Component {

     constructor(props){
        super(props);
        this.state = {
            email : '',
            password: '',
        }
     }

     onSubmit(e){
        e.preventDefault();
        const {email , password} = this.state ;
        axios.post('api/login', {
            email,
            password
          })
          .then(response=> {
            console.log(response.data);
            this.setState({err: false});
            this.props.history.push("home") ;

          })
          .catch(error=> {
            this.refs.email.value="";
            this.refs.password.value="";
            this.setState({err: true});
          });
     }

     onChange(e){
        const {name, value} = e.target;
        this.setState({[name]: value});
     }

	render() {

        let error = this.state.err ;
        let msg = (!error) ? 'Login Successful' : 'Wrong Credentials' ;
        let name = (!error) ? 'alert alert-success' : 'alert alert-danger' ;
	    return (
      <div style={classes.root}>
        <form role="form" method="POST" onSubmit={this.onSubmit.bind(this)}>
            <Grid container>
              <Grid item xs={1} sm={1} md={4}>
              </Grid>
              <Grid item xs={10} sm={9} md={4}>
                <Card style={classes.card}>
                  <CardMedia
                    style={{height: 120, backgroundSize: 'contain', marginTop: 25}}
                    image={logo}
                    title="Contemplative Reptile"
                    />
                  <CardContent>

                    <Typography gutterBottom variant="headline" component="h2">
                      Login
                    </Typography>
                    <TextField
                      required
                      onChange={this.onChange.bind(this)}

                      id="email"
                      name="email"
                      label="E-mail"
                      type="email"
                      margin="dense"
                      fullWidth
                    />
                    <TextField
                      required
                      onChange={this.onChange.bind(this)}
                      id="password"
                      name="password"
                      label="Password"
                      type="password"
                      autoComplete="current-password"
                      margin="dense"
                      fullWidth
                    />

                  <Button variant="raised" color="primary" style={classes.button} type="submit">
                       Login
                     </Button>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </form>
          </div>
  	);
  }
}

export default Login;
