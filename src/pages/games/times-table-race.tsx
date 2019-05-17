import Card from "@material-ui/core/Card"
import React, { useRef, useState } from "react"
import Responsive from "react-responsive"

import FabButton from "../../components/shared/FabButton"
import THEME from "../../theme"

const START = "START"
const PLAY = "PLAY"
const COMPLETE = "COMPLETE"
const NUM_ROUNDS = 10;

const Mobile = props => <Responsive {...props} maxWidth={767} />
const Default = props => <Responsive {...props} minWidth={768} />

const StartScreen = ({ startGame }) => (
  <div>
    <button onClick={startGame}>Start game</button>
  </div>
)

const PlayScreen = ({ question, answer, editAnswer, submitAnswer }) => {
  const inputEl = useRef(null);
  const onSubmit = (e) => {
    inputEl.current.focus()
    submitAnswer.apply(null, e)
  };
  return (
    <div>
      <p>{question.a} x {question.b} = 
        <input 
          autoFocus={true} 
          placeholder="?" 
          value={answer} 
          onChange={editAnswer}
          ref={inputEl}
        />
      </p>
      <button onClick={onSubmit}>Submit</button>
    </div>
  )
}

const CompleteScreen = ({ resetGame, questions, answers, time}) => (
  <div>
    <p> Time: {time / 1000} seconds</p>
    <table>
      {questions.map((q, i) =>(
        <tr key={`${i}-${q.a}x${q.b}`}>
          <td>{q.a}</td>
          <td>x</td>
          <td>{q.b}</td>
          <td>=</td>
          <td>{answers[i]}</td>
          <td>{answers[i] === `${q.a * q.b}`? "Correct" : `Incorrect (${q.a * q.b})`}</td>
        </tr>
      ))}
    </table>
    <button onClick={resetGame}>Game complete. Reset game</button>
  </div>
)

const generateQuestions = () => Array.from({length: NUM_ROUNDS}).map(() => ({
  // tslint:disable-next-line:insecure-random
  a: Math.ceil(Math.random() * 12),
  // tslint:disable-next-line:insecure-random
  b: Math.ceil(Math.random() * 12)
}))

const gameScreens = {
  [START]: props => <StartScreen {...props} />,
  [PLAY]: props => <PlayScreen {...props} />,
  [COMPLETE]: props => <CompleteScreen {...props} />
}

const useGameStatus = (status, setStartTime, setEndTime) => {
  const [gameStatus, setGameStatus] = React.useState(status);

  React.useEffect(() => {
    if(gameStatus === PLAY){
      setStartTime(Date.now())
    };
  }, [gameStatus]);

  React.useEffect(() => {
    if(gameStatus === COMPLETE){
      setEndTime(Date.now())
    };
  }, [gameStatus]);

  return [gameStatus, setGameStatus];
};

const ContentArea = () => {
  const [questions, setQuestions] = useState([])
  const [startTime, setStartTime] = useState(0)
  const [endTime, setEndTime] = useState(0)
  const [gameStatus, setGameStatus] = useGameStatus(START, setStartTime, setEndTime)
  const [gameRound, setGameRound] = useState(0)
  const [answers, setAnswers] = useState([]) 

  const gameProps = {
    [START]: {
      startGame: () => {
        setAnswers([])
        setGameRound(0)
        setQuestions(generateQuestions())
        setGameStatus(PLAY)
      }
    },
    [PLAY]: {
      answer: answers[gameRound] || "",
      editAnswer: (event) => {
        const newAnswers = [...answers]
        if(gameRound === newAnswers.length){
          newAnswers.push(event.target.value)
        }else{
          newAnswers[gameRound] = event.target.value
        }
        setAnswers(newAnswers)
      },
      question: questions[gameRound],
      submitAnswer: () => {
        if(answers.length <= gameRound){
          return
        }
        if (answers.length < NUM_ROUNDS){
          setGameRound(gameRound + 1)
        }else{
          setGameStatus(COMPLETE)
        }
      }
    },
    [COMPLETE]: {
      answers,
      questions,
      resetGame: () => setGameStatus(START),
      time: endTime - startTime
    }
  }

  const gameScreen = gameScreens[gameStatus](gameProps[gameStatus])
  return (
    <Card style={{ padding: 50 }}>
      <h1
        style={{
          marginBottom: 30,
          marginLeft: 30,
          marginRight: 30,
          marginTop: 0,
          textAlign: "center",
        }}
      >
        Speed times table game
      </h1>
      <dl>
        <dt>gameStatus</dt>
        <dd>{gameStatus}</dd>
        <dt>gameRound</dt>
        <dd>{gameRound}</dd>
        <dt>startTime</dt>
        <dd>{startTime}</dd>
        <dt>answers</dt>
        <dd>{answers.length}</dd>
      </dl>
      {gameScreen}
    </Card>
  )
}

const HeaderArea = () => {
  const goBack = () => window.history.back()
  return <FabButton onClickHandler={goBack} />
}

export default () => {
  return (
    <>
      <Default>
        <div
          style={{
            backgroundColor: THEME.aboutPage.layout.backgroundColor,
            minHeight: "100vh",
          }}
        >
          <div
            style={{
              margin: "0 auto",
              maxWidth: THEME.aboutPage.layout.cardMaxWidth,
              paddingBottom: 40,
              paddingLeft: 20,
              paddingRight: 20,
              paddingTop: 40,
            }}
          >
            <HeaderArea />
            <ContentArea />
          </div>
        </div>
      </Default>
      <Mobile>
        <HeaderArea />
        <ContentArea />
      </Mobile>
    </>
  )
}