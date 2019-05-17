import Card from "@material-ui/core/Card";
import React, { useState } from "react";

import { CompleteScreen } from "./CompleteScreen";
import { PlayScreen } from "./PlayScreen";
import { StartScreen } from "./StartScreen";

export const START = "START"
export const PLAY = "PLAY"
export const COMPLETE = "COMPLETE"
export const NUM_ROUNDS = 10;

const generateQuestions = () => Array.from({ length: NUM_ROUNDS }).map(() => ({
  // tslint:disable-next-line:insecure-random
  a: Math.ceil(Math.random() * 12),
  // tslint:disable-next-line:insecure-random
  b: Math.ceil(Math.random() * 12)
}));

const gameScreens = {
  [START]: props => <StartScreen {...props} />,
  [PLAY]: props => <PlayScreen {...props} />,
  [COMPLETE]: props => <CompleteScreen {...props} />
};

const useGameStatus = (status, setStartTime, setEndTime) => {
  const [gameStatus, setGameStatus] = React.useState(status);
  React.useEffect(() => {
    if (gameStatus === PLAY) {
      setStartTime(Date.now());
    }
    ;
  }, [gameStatus]);
  React.useEffect(() => {
    if (gameStatus === COMPLETE) {
      setEndTime(Date.now());
    }
    ;
  }, [gameStatus]);
  return [gameStatus, setGameStatus];
};
export const Game = () => {
  const [questions, setQuestions] = useState([]);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [gameStatus, setGameStatus] = useGameStatus(START, setStartTime, setEndTime);
  const [gameRound, setGameRound] = useState(0);
  const [answers, setAnswers] = useState([]);
  const gameProps = {
    [START]: {
      startGame: () => {
        setAnswers([]);
        setGameRound(0);
        setQuestions(generateQuestions());
        setGameStatus(PLAY);
      }
    },
    [PLAY]: {
      answer: answers[gameRound] || "",
      editAnswer: (event) => {
        const newAnswers = [...answers];
        if (gameRound === newAnswers.length) {
          newAnswers.push(event.target.value);
        }
        else {
          newAnswers[gameRound] = event.target.value;
        }
        setAnswers(newAnswers);
      },
      question: questions[gameRound],
      submitAnswer: () => {
        if (answers.length <= gameRound) {
          return;
        }
        if (answers.length < NUM_ROUNDS) {
          setGameRound(gameRound + 1);
        }
        else {
          setGameStatus(COMPLETE);
        }
      }
    },
    [COMPLETE]: {
      answers,
      questions,
      resetGame: () => setGameStatus(START),
      time: endTime - startTime
    }
  };
  const gameScreen = gameScreens[gameStatus](gameProps[gameStatus]);
  return (<Card style={{ padding: 50 }}>
    <h1 style={{
      marginBottom: 30,
      marginLeft: 30,
      marginRight: 30,
      marginTop: 0,
      textAlign: "center",
    }}>
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
  </Card>);
};
