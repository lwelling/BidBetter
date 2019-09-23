import React from 'react';
import './FormContainer.css';
import Input from '../Input/Input'
import Select from '../Select/Select'
import Button from '../Button/Button'
import BidResult from '../BidResult/BidResult'
import BBLogo from '../BBLogo/BBLogo'

class FormContainer extends React.Component {
    constructor(props){
        super(props);

        this.state = {
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

            conditionOptions: ['Scrap', 'Edgy', 'Average', 'Clean', 'Spotless']
        }

    }

    handleFormSubmit = (e) => {
        e.preventDefault();
        const bid = this.calculateBid();
        const toggle = this.state.visible
        this.setState({ visible: !toggle})
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
        this.setState( prevState => ({newVehicle : 
            {...prevState.newVehicle, condition: value
            }
        }))
    }



    render() {

        const { newVehicle } = this.state;

        return (
            <div className='formContainer'>
                    <BBLogo />

                <h2>
                    BidBetter!
                </h2>

                <form className='container' onSubmit={this.handleFormSubmit}>
                    {
                        Object.entries(newVehicle).map(([bookName, book], index) => bookName === 'condition' ? null : (
                            <Input type={'number'}
                                key={index}
                                name={bookName}
                                value={book.value}
                                placeholder={book.prettyName}
                                handleChange={e => this.handleFormChange(e.target.value, bookName)}
                            />
                        ))
                    }
                    <Select
                        name={'condition'}
                        options = {this.state.conditionOptions} 
                        value = {this.state.newVehicle.condition}
                        placeholder = {'How Nice?'}
                        handleChange = {this.handleCondition}
                    />
                    <Button
                        title={'Bid It Better!'}
                        action={this.handleFormSubmit}
                    />
                </form>

                <span>
                    <BidResult 
                        visible={this.state.visible}
                        betterBid={this.state.betterBid}
                    />
                </span>
            </div>
        )
    }
}

export default FormContainer;
