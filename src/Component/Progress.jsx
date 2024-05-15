import React from 'react';

const Progress = ({index,answer,numQuestion,maxPossiblePoints,points}) => {
  return (
    <header className='progress'>
      
          <progress max={numQuestion} value={index + Number(answer !== null)} />
          <div className="ques-answer">
            <p>Question <strong>{index + 1}</strong> / {numQuestion}</p>
            <p><strong>{points}</strong> / {maxPossiblePoints} Points</p>
          </div>
          
    </header>
  );
}

export default Progress;
