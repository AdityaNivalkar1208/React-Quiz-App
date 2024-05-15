import React from 'react';

const FinishScreen = ({points, highScore, maxPossiblePoints, dispatch}) => {
    
    const percentage = (points / maxPossiblePoints) * 100;

    let emoji;
    
    if (percentage === 100 && percentage >= 85) emoji = '🎉'
    else if (percentage < 85 && percentage >= 60) emoji = '🤩'
    else if(percentage < 60 && percentage >= 35) emoji = '😎'
  else if (percentage < 35 && percentage >= 0) emoji = '😭'
  if(percentage === 0) emoji = '🤣'
   
    

  return (
    <div>
      <p className="result" style={{display:'inline-block',padding:'1.2rem',fontSize:'1.5rem'}}>
          You scored <strong>{points}</strong> out of {maxPossiblePoints} ({Math.ceil(percentage)}%) <span>{emoji}</span>
      </p>
      
      <p className="highscore" style={{fontSize:'1.2rem'}}>(Highscore: {highScore} points)</p>

      <button className="button" onClick={() => dispatch({type:'restart'})}>Restart Quiz</button>
    </div>
  );
}

export default FinishScreen;
