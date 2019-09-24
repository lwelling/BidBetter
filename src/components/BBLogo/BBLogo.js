import React from 'react';
import './BBLogo.css';

class BBLogo extends React.Component {
    render() {
        return (
            <div className="shrink">
                <img src={ require('./emblem1.png') } alt={'emblem'} />
            </div>
        )
    }
}

export default BBLogo