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
                blueBook: '',
                blackBook: '',
                nada: '',
                mmr: '',
                condition: ''
            },

            betterBid: '',
            visible: false,

            conditionOptions: ['Scrap', 'Edgy', 'Average', 'Clean', 'Spotless']
        }

    }

    handleFormSubmit = (e) => {
        e.preventDefault()
        const bid = this.calculateBid();
        const toggle = this.state.visible
        this.setState({ visible: !toggle})
        this.setState({ betterBid: bid })

    }  

    calculateBid = () => {
        const carCond = this.state.newVehicle.condition;
        const bid = (this.state.newVehicle.blueBook + this.state.newVehicle.blackBook + this.state.newVehicle.nada + this.state.newVehicle.mmr) / 4 - 700;
        return bid
    };

    handleFormChange = (value, key) => {
        const numVal = parseInt(value);
        this.setState(prevState => ({ newVehicle : 
             {...prevState.newVehicle, [key]: numVal
             }
           }))  
    }

    handleBlueBook = e => {
        const value = e.target.value;
        const numVal = parseInt(value);
        this.setState(prevState => ({ newVehicle : 
             {...prevState.newVehicle, blueBook: numVal
             }
        }))
    }

    handleBlackBook = e => {
        const value = e.target.value;
        const numVal = parseInt(value);
        this.setState( prevState => ({ newVehicle : 
            {...prevState.newVehicle, blackBook: numVal
            }
        }))
    }

    handleNada = (e) => {
        const value = e.target.value;
        const numVal = parseInt(value);
        this.setState( prevState => ({ newVehicle : 
            {...prevState.newVehicle, nada: numVal
            }
        }))
    }

    handleMmr = (e) => {
        const value = e.target.value;
        const numVal = parseInt(value);
        this.setState( prevState => ({ newVehicle : 
            {...prevState.newVehicle, mmr: numVal
            }
        }))
    }

    handleCondition = (e) => {
        const value = e.target.value;
        this.setState( prevState => ({newVehicle : 
            {...prevState.newVehicle, condition: value
            }
        }))
    }



    render(){

        return (
            <div className='formContainer'>
                    <BBLogo />

                <h2>
                    BidBetter!
                </h2>

                <form className='container' onSubmit={this.handleFormSubmit}>
                    <Input type={'number'}
                        name= {'blueBook'}
                        value={this.state.newVehicle.blueBook} 
                        placeholder = {'Blue Book'}
                        handleChange = {e => this.handleFormChange(e.target.value, 'blueBook')}
                    />
                    <Input type={'number'}
                        name= {'blackBook'}
                        value={this.state.newVehicle.blackBook} 
                        placeholder = {'Black Book'}
                        handleChange = {e => this.handleFormChange(e.target.value, 'blackBook')}
                    />
                    <Input type={'number'}
                        name= {'nada'}
                        value={this.state.newVehicle.nada} 
                        placeholder = {'NADA'}
                        handleChange = {e => this.handleFormChange(e.target.value, 'nada')}
                    />
                    <Input type={'number'}
                        name= {'mmr'}
                        value={this.state.newVehicle.mmr} 
                        placeholder = {'MMR'}
                        handleChange = {e => this.handleFormChange(e.target.value, 'mmr')}
                    />
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