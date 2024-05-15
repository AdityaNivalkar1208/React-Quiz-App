import {useEffect, useReducer} from 'react';
import './App.css';
import Header from './Component/Header';
import Main from './Component/Main';
import Loader from './Component/Loader';
import Error from './Component/Error';
import StartScreen from './Component/StartScreen';
import Question from './Component/Question';
import Progress from './Component/Progress';
import Footer from './Component/Footer';
import NextButton from './Component/NextButton';
import Timer from './Component/Timer';
import FinishScreen from './Component/FinishScreen';

import questionData from './questions.json';

const SECONDS_PER_QUESTION = 30;

const initialState = {
    questions: [],
    status: 'loading',
    index: 0,
    answer: null,
    points: 0,
    highScore: 0,
    secondsRemaining: 10,
}

function reducer(state, action) {
    switch (action.type) {

        case "dataReceived":
            return {
                ...state,
                questions: action.payload,
                status: 'ready'
            };
        case "dataFailed":
            return {
                ...state,
                status: 'error'
            };
        
        case 'start':
            return {
                ...state,
                status: 'active',
                secondsRemaining: state.questions.length * SECONDS_PER_QUESTION
            };
        
        case 'newAnswer':
            const question = state.questions.at(state.index);
            return {
                ...state,
                answer: action.payload,
                points : action.payload === question.correctOption ? state.points + question.points : state.points
            };
        
        case 'nextButton':
            return {
                ...state,
                index: state.index + 1,
                answer : null,
            }
        
        case 'finish':
            return {
                ...state,
                highScore: state.points > state.highScore ? state.points : state.highScore,
                status: 'finish'
            }

        case "tick":
        return {
          ...state,
          secondsRemaining: state.secondsRemaining - 1,
          status : state.secondsRemaining === 0 ? 'finished' : state.status,
        }

        case "restart" : 
            return {
                ...initialState,
                questions: state.questions,
                status : "ready"

            }

        default:  
            throw new Error ("Action Unkown")
    }
}


function App() {

    const [ {questions, status, index, answer, points, highScore, secondsRemaining}, dispatch ] = useReducer(reducer, initialState);
    
    const numQuestion = questions.length;
    const maxPossiblePoints = questions.reduce((prev, cur) => prev + cur.points,0)
    

    useEffect(() => {
    dispatch({ type: 'dataReceived', payload: questionData.questions });
  }, []);
    
    
    return (
        <div className = "app" >
            <Header />
            <Main>
                {status === 'loading' && <Loader/>}
                {status === 'error' && <Error />}
                {status === 'ready' && <StartScreen numQuestions={numQuestion} dispatch={dispatch} />}
                {status === 'active' && 
                
                (
                    <>
                        <Progress index={index} numQuestion={numQuestion} maxPossiblePoints={maxPossiblePoints} points={points} answer={answer} />
                        <Question question={questions[ index ]} dispatch={dispatch} answer={answer} />    

                        <Footer>
                            <Timer secondsRemaining={secondsRemaining} dispatch={dispatch}></Timer>
                            <NextButton index={index} numQuestion={numQuestion} dispatch={dispatch} answer={answer} />
                        </Footer>

                    </> 
                )
                
                }

                {
                    status === 'finish' && <FinishScreen highScore={highScore} points={points} maxPossiblePoints={maxPossiblePoints} dispatch={dispatch}/>
                }
            </Main>
        </div>
    );
}

export default App;