import React from 'react';

function NextButton({index,answer,numQuestion,dispatch}) {
    if (answer === null) return;
    if (index < numQuestion - 1) return <button className="nextbutton" onClick={() => dispatch({type: "nextButton"})}>Next</button>
    if (index === numQuestion - 1) return <button className="nextbutton" onClick={() => dispatch({type: "finish"})}>Finish</button>
}

export default NextButton;
