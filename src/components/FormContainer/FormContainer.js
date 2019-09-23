import React from 'react';
import './FormContainer.css';
import Input from '../Input/Input'
import Select from '../Select/Select'
import Button from '../Button/Button'

const FormContainer = ({ handleSelect, handleInput, handleSubmit, newVehicle }) => {
    const conditions = ['Scrap', 'Edgy', 'Average', 'Clean', 'Spotless'];

    return (
        <>
            <form className='container' onSubmit={handleSubmit}>
                {
                    Object.entries(newVehicle).map(([bookName, book], index) => bookName === 'condition' ? null : (
                        <Input type={'number'}
                            key={index}
                            name={bookName}
                            value={book.value}
                            placeholder={book.prettyName}
                            handleChange={e => handleInput(e.target.value, bookName)}
                        />
                    ))
                }
                <Select
                    name={'condition'}
                    options = {conditions} 
                    value = {newVehicle.condition}
                    placeholder = {'How Nice?'}
                    handleChange = {handleSelect}
                />
                <Button
                    title={'Bid It Better!'}
                    action={handleSubmit}
                />
            </form>
        </>
    );
}

export default FormContainer;
