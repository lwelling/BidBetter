import React from 'react';
import './Button.css';

const Button = (props) => {
    return(
        <button 
            style= {props.style} 
            onClick= {props.action}>    
            {props.title} 
        </button>)
}

export default Button;