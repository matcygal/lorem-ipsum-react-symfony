import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import CookieConsent from "react-cookie-consent";
import Parser from 'html-react-parser';
import axios from 'axios';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Send from "@material-ui/icons/Send";
import AdSense from 'react-adsense';
import Logo from "./../img/logo.jpg";

require('./../css/app.css');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ipsum: '',
      int: 1,
      value: 2
    }
  }

  getIpsum() {
    axios.get('/api/ipsum',
      {
        params: {
          number: this.state.int,
          nav: this.state.value
        }
      }
    ).then((response) => {
      this.setState({ ipsum: response.data })
    }).catch((error) => {
      console.log(error)
    })
  };

  handleIntChange = int => event => {
    var max = 10;
    if (this.state.value === 2) {
      max = 10;
    } else if (this.state.value === 1) {
      max = 50;
    } else if (this.state.value === 0) {
      max = 500;
    }
    if (0 < event.target.value && event.target.value <= max) {
      this.setState({
        [int]: event.target.value,
      });
    }
    if (this.state.int > max) {
      this.setState({
        [int]: max,
      });
    }
  };
  handleTabChange = (event, value) => {
    this.setState({ value });
    if (value === 2 && this.state.int > 10) {
      this.setState({
        int: 10,
      });
    } else if (value === 1 && this.state.int > 50) {
      this.setState({
        int: 50,
      });
    } else if (value === 0 && this.state.int > 500) {
      this.setState({
        int: 500,
      });
    }
  };

  handleClickEvent = event => {
    this.getIpsum();
  };

  componentDidMount() {
    this.getIpsum();
  }

  render() {
    if (this.state.ipsum) {
      var ipsum = Parser(this.state.ipsum)
    }
    return (
      <div style={{ flex: 1, flexGrow: 1, marginLeft: '5%', marginRight: '5%' }}>
        <Grid container justify='center' spacing={8} >
          <Grid item style={{ marginTop: '40px' }} xs={12} md={8}>
            <Paper style={{ padding: '20px' }}><img src={Logo} style={{ width: '100%' }} alt='Janusz-Ipsum' /></Paper>
          </Grid>
        </Grid>
        <Grid container justify='center' spacing={8} >
          <Grid item style={{ marginTop: '40px' }} xs={12} md={12}>
            <Paper style={{ padding: '20px' }}>
              <Typography style={{ textIndent: '0em', textAlign: 'center' }}>
                Generator tekstu typu Lorem Ipsum generujący tymczasowy tekst na potrzeby projektowe na podstawie tekstu Lorem Ipsum i stereotypowych powiedzonek polskiego "Janusza".
              </Typography>
              <AdSense.Google
                client='ca-pub-2145122579627233'
                slot='1470482978'
                style={{ display: 'block', marginTop: '20px', marginBottom: '20px' }}
                layout='in-article'
                format='fluid'
              />
              <Typography style={{ textIndent: '0em', textAlign: 'center' }}>
                Za kazdym razem gdy klikniesz w reklome, twojemu somsiadowi nie odpali Passat.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
        <Grid container justify='space-around' style={{ marginTop: '40px' }} spacing={8} >
          <Grid style={{}} item xs={12} md={6} >
            <Tabs
              value={this.state.value}
              indicatorColor="primary"
              textColor="primary"
              onChange={this.handleTabChange}
              fullWidth
            >
              <Tab label="Słów" />
              <Tab label="Zdaniów" />
              <Tab label="Paragrafów" />
            </Tabs>
          </Grid>
          <Grid style={{ textAlign: 'center' }} item xs={6} md={3}>
            <form noValidate autoComplete="off">
              <TextField
                id="number"
                label="Ile tego"
                placeholder="Placeholder"
                value={this.state.int}
                onChange={this.handleIntChange('int')}
                type="number"
                style={{ verticalAlign: 'top', width: '70%' }}
                InputLabelProps={{
                  shrink: true,
                }}
                margin="none"
              />
            </form>
          </Grid>
          <Grid style={{ textAlign: 'right' }} item xs={6} md={3}>
            <Button color="primary" variant="outlined" style={{ padding: '15px', width: '90%' }} onClick={this.handleClickEvent}>
              Wincyj!  <Send style={{ marginLeft: '5px' }} />
            </Button>
          </Grid>
        </Grid>
        <Grid container justify='center' spacing={8} >
          <Grid item style={{ marginTop: '40px', marginBottom: '60px' }} xs={12}>
            <Paper style={{ padding: '15px 40px' }}>
              <Typography align="justify" headlineMapping={{ body1: 'div' }}>
                {ipsum}
              </Typography>
            </Paper>
          </Grid>
        </Grid>
        <CookieConsent
          location="bottom"
          buttonText="Akceptuje"
          style={{ background: "white", textAlign: "center", borderTop: "1px solid black" }}
          buttonStyle={{ color: "#3f51b5", background: "white", fontSize: "0.875rem", border: '1px solid rgba(63, 81, 181, 0.5)', borderRadius: '4px' }}
          expires={150}
        >
          <span style={{ color: 'black', fontSize: "0.75rem", fontFamily: "Roboto, Helvetica, Arial, sans-serif" }}>Korzystanie z tego serwisu jest jednoczesnym wyrażeniem zgody na używanie cookies, zgodnie z aktualnymi ustawieniami przeglądarki. Można zmienić ustawienia w przeglądarce tak aby nie pobierała ona cookies.</span>
        </CookieConsent>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
