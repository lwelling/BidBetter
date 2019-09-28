import React, { Component } from 'react';

import './App.css';
import FormContainer from '../FormContainer/FormContainer'
import BBLogo from '../BBLogo/BBLogo';
import BidResult from '../BidResult/BidResult';

import { meanValue, standardDeviation } from '../../utils/mathHelpers';

class App extends Component {
  state = {
    newVehicle: {
      miles: {
        prettyName: 'Mileage',
        value: '',
      },
      mmr: {
        prettyName: 'MMR',
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
      blueBook: {
        prettyName: 'Blue Book',
        value: '',
      },
      condition: {
        value: 'placeholder',
        displayName: 'How Nice?',
        multiplier: null,
      },
      blueBookLending: {
        prettyName: 'Lending Value',
        value: '',
      }
    },
    betterBid: '',
    visible: false,
  }

  removeOutliers = (books) => {
    const bookValues = books.map(book => book.value);
    const acceptableDeviation = 1.25 * standardDeviation(bookValues);
    return bookValues.filter(book => Math.abs(meanValue(bookValues) - book) <= acceptableDeviation);
  }

  bblValue = () => {
    return Math.random() * 40000;
  }
  
  calculateBid = () => {
    const {
      blackBook,
      blueBook,
      // blueBookLending,
      condition,
      miles,
      mmr,
      nada,
    } = this.state.newVehicle;

    const normalBooks = this.removeOutliers([blackBook, blueBook, mmr, nada]);
    // Leaving console.logs in cause they're nice to see when you're learning.
    // But usually you don't want to push any code with console.logs still sitting around
    console.log('this.state: ', this.state);
    const condFac = condition.multiplier;
    if (condFac === null) {
      // TODO:
      // condition hasn't been selected, throw error
      return;
    }
    console.log('condFac: ', condFac);
    console.log(`'normalBooks': ${normalBooks}`)
    // const reducer = (accumulator, currentValue) => accumulator + currentValue;
    // const bidPreMiles = ((normalBooks.reduce(reducer)) /normalBooks.length) - 700;
    const bidPreMiles = meanValue(normalBooks) - 700;
    console.log(`bidPreMiles: ${bidPreMiles}`)
    // const bidPreCond = (miles.value <= 150000) ? bidPreMiles : (mmr.value -700);
    const bidBeforeCondition = miles.value < 150000
      ? meanValue(normalBooks) - 700
      : mmr.value - 700;
    console.log('bidBeforeCondition: ', bidBeforeCondition, typeof bidBeforeCondition);
    const bid = (bidBeforeCondition * condFac).toFixed(2);
    console.log('bid: ', bid, typeof bid);
    return bid + 1700 < this.bblValue() ? bid : `${bid} **Might Be Too Close to KBB**`
    // return bid + 1700 < +blueBookLending.value ? bid : `${bid} **Might Be Too Close to KBB**`
  };
  
  handleCondition = condition => {
    console.log('condition: ', condition);
    this.setState(prevState => ({
      newVehicle: {
        ...prevState.newVehicle,
        condition,
      }
    }));
  }

  handleFormChange = (value, key) => {
    value = +value;
    this.setState(prevState => ({
      newVehicle: {
        ...prevState.newVehicle,
        [key]: {
          ...prevState.newVehicle[key],
          value,
        }
      }
    }));
  }

  handleFormSubmit = (e) => {
    e.preventDefault();
    this.setState({ betterBid: this.calculateBid() });
    this.setState({ visible: !(this.state.visible) });
  }

  render() {
    const { betterBid, newVehicle, visible } = this.state;
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
          newVehicle={newVehicle}
          classname="flex-item"
        />
        <span>
          <BidResult
            visible={visible}
            betterBid={betterBid}
          />
        </span>
      </div>
    );
  }
}

export default App;
