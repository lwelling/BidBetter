import React, { Component } from 'react';
import './App.css';
import FormContainer from '../FormContainer/FormContainer'
import BBLogo from '../BBLogo/BBLogo';
import BidResult from '../BidResult/BidResult';

class App extends Component {
  state = {
    newVehicle: {
      blueBook: {
        prettyName: 'Blue Book',
        value: '',
      },
      blackBook: {
        prettyName: 'Black Book',
        value: '',
      },
      nada: {
        prettyName: 'NADA',
        value: '',
      },
      mmr: {
        prettyName: 'MMR',
        value: '',
      },
      condition: '',
    },
    betterBid: '',
    visible: false,
  }

  handleFormSubmit = (e) => {
    e.preventDefault();
    const bid = this.calculateBid();
    const toggle = this.state.visible
    this.setState({ visible: !toggle })
    this.setState({ betterBid: bid })

  }

  calculateBid = () => {
    const { blueBook, blackBook, nada, mmr, condition } = this.state.newVehicle;
    const bid = (blueBook.value + blackBook.value + nada.value + mmr.value) / 4 - 700;
    return bid
  };

  handleFormChange = (value, key) => {
    value = +value;
    this.setState(prevState => ({
      newVehicle: {
        ...prevState.newVehicle,
        [key]: {
          value,
        }
      }
    }));
  }

  handleCondition = (e) => {
    const value = e.target.value;
    this.setState(prevState => ({
      newVehicle:
      {
        ...prevState.newVehicle, condition: value
      }
    }))
  }

  render() {
    return (
      <div className='form-container'>
        <BBLogo />
        <h2>
          BidBetter!
        </h2>
        <FormContainer
          handleSelect={this.handleCondition}
          handleInput={this.handleFormChange}
          handleSubmit={this.handleFormSubmit}
          newVehicle={this.state.newVehicle}
          classname="flex-item"
        />
        <span>
          <BidResult
            visible={this.state.visible}
            betterBid={this.state.betterBid}
          />
        </span>
      </div>
    );
  }
}

export default App;
