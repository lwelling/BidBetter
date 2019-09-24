import React, { Component } from 'react';
import './App.css';
import FormContainer from '../FormContainer/FormContainer'
import BBLogo from '../BBLogo/BBLogo';
import BidResult from '../BidResult/BidResult';

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
        prettyName: 'How Nice?',
        value: '',
      },
      blueBookLending: {
        prettyName: 'Lending Value',
        value: '',
      }
    },
    betterBid: '',
    visible: false,
  
  }

  condFactor = () => {
    const { condition } = this.state.newVehicle;
    if(condition === 'Scrap'){
      return 0.80
    } else if(condition === 'Edgy'){
      return 0.97
    } else if(condition === 'Clean'){
      return 1.005
    } else if (condition === 'Spotless'){
      return 1.06
    } else {
      return 1
    }
  }

  calculateStandardDev = () => {
    const { blueBook, blackBook, nada, mmr } = this.state.newVehicle;
    const bookArray = [blueBook.value, blackBook.value, nada.value, mmr.value]
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    const avg = (bookArray.reduce(reducer))/bookArray.length;
    const diffArray = bookArray.map(book => (Math.pow((book - avg), 2)));
    let stdDev = (Math.sqrt((diffArray.reduce(reducer)) / diffArray.length)) * 1.25;
    stdDev = +stdDev;
    console.log(stdDev)
    const booksAdj = bookArray.filter(function(book) {
      return Math.abs(avg-(+book)) <= stdDev;
    });
    return booksAdj
  }


  
  calculateBid = () => {
    const { blueBookLending, mmr, miles} = this.state.newVehicle;
    const booksAdj = this.calculateStandardDev();
    const condFac = +this.condFactor();
    console.log(`condFac: ${booksAdj}`)
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    const bidPreMiles = ((booksAdj.reduce(reducer)) /booksAdj.length) - 700;
    console.log(`bidPreMiles: ${bidPreMiles}`)
    const bidPreCond = (miles.value <= 150000) ? bidPreMiles : (mmr.value -700);
    const bid = (bidPreCond * condFac).toFixed(2);
    return (+bid + 1700 < +blueBookLending.value) ? bid : `${bid} **Might Be Too Close to KBB**`
  };

  handleFormSubmit = (e) => {
    e.preventDefault();
    this.condFactor();
    this.calculateStandardDev();
    this.setState({ betterBid: this.calculateBid() });
    this.setState({ visible: !(this.state.visible) });
  }

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
