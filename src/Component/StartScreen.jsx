import React from 'react';
import '../Style/StartScreen.css'

const StartScreen = ({numQuestions,dispatch}) => {
  return (
    <div className="start">
      <h2>Welcome To The React Quiz</h2>
      <h3>{numQuestions} question to test your react mastery</h3>
      <button className="button" onClick={()=> dispatch({type:"start"})}>Let's Start</button>
    </div>
  );
}

export default StartScreen;
