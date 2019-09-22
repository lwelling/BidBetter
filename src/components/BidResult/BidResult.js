import React from 'react';
import './BidResult.css'


function BidResult (props) {
    let visible = props.visible;
    let betterBid = props.betterBid;
    if (visible) {
        return (
            <h3>
               {betterBid}
            </h3>
        )
    } else {
        return (
         <div className="fixed">
            <h3>
            </h3>
         </div>
        )
    }

}

export default BidResult;