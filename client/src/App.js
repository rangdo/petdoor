import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import socketIOClient from "socket.io-client"

class App extends Component {

  constructor() {
    super();
    this.state = {
      response: 'idle',
      endpoint: process.env.REACT_APP_DOOR_SERVICE,
      socket: null
    };
  }

  componentDidMount() {
    console.log("App did mount");
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);
    this.setState({ socket });
      socket.on("something", data => this.setState({ response: data.status }));
  }

  handleOpenClick = () => {
    this.state.socket.emit('message', "open");
  }

  handleCloseClick = () => {
    this.state.socket.emit('message', "close");
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Chicken Control Centre</h1>
            </header>
	<div style={{backgroundColor: this.state.response !== "idle" ? 'red' : 'green'}}>
            <button
          className="btn btn-default"
          style={{ margin: '10px 10px 10px 0' }}
          onClick={this.handleOpenClick}>Open</button>
            <button
        className="btn btn-default"
          style={{ margin: '10px 10px 10px 0' }}
        onClick={this.handleCloseClick}>Close</button>
	    <p>{this.state.response}</p>
        </div>
        {this.state.socket !== null &&
          <div style={{ backgroundColor: this.state.socket.connected ? 'green' : 'red' }}>
            <p>{this.state.socket.connected ? 'connected' : 'disconnected'}</p>
          </div>}
      </div>
    );
  }
}

export default App;
