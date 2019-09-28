import React from 'react';
import './Select.css';

const Select = ({ handleChange, name, options, placeholder, title }) => (
  <div className="form-group">
    <label htmlFor={name}> {title} </label>
    <select
      name={name}
      defaultValue={placeholder}
      onChange={e => handleChange(options.find(option => option.value === e.target.value))}
    >
      <option value={placeholder} disabled>{placeholder}</option>
      {options.map((option, idx) => 
        <option
          key={idx}
          value={option.value}
          label={option.displayValue}>{option.displayValue}
        </option>
      )}
    </select>
</div>
);

export default Select;
