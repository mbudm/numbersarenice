import Card from "@material-ui/core/Card";
import React, { createContext, useState } from "react";

import { CompleteScreen } from "./CompleteScreen";
import { GameHeader } from "./GameHeader";
import { PlayScreen } from "./PlayScreen";
import { StartScreen } from "./StartScreen";

export const GameContext = createContext(null);

export const START = "START"
export const PLAY = "PLAY"
export const COMPLETE = "COMPLETE"
export const NUM_ROUNDS = 10;

const gameScreens = {
  [START]: <StartScreen />,
  [PLAY]: <PlayScreen />,
  [COMPLETE]: <CompleteScreen />
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

  return (
    <GameContext.Provider value={{
      answers,
      endTime,
      gameRound,
      gameStatus,
      questions,
      setAnswers,
      setEndTime,
      setGameRound,
      setGameStatus,
      setQuestions,
      setStartTime,
      startTime,
    }}>
      <Card style={{ padding: 50 }}>
        <GameHeader />
        {gameScreens[gameStatus]}
      </Card>
    </GameContext.Provider>
  );
};
