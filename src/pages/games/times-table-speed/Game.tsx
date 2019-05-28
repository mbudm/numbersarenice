import Card from "@material-ui/core/Card";
import * as React from "react";

import { ILeaderboardEntry } from "../common/leaderboard/getLeaderboardData";
import { CompleteScreen } from "./CompleteScreen";
import { GameHeader } from "./GameHeader";
import { PlayScreen } from "./PlayScreen";
import { ScoringScreen } from "./ScoringScreen";
import { StartScreen } from "./StartScreen";

export const GameContext = React.createContext(null);

export const START = "START"
export const PLAY = "PLAY"
export const SCORING = "SCORING"
export const COMPLETE = "COMPLETE"
export const NUM_ROUNDS = 2
export const GAME_KEY = "nn_tt_speed" // for localstorage

const gameScreens = {
  [START]: (<StartScreen />),
  [PLAY]: (<PlayScreen />),
  [SCORING]: (<ScoringScreen />),
  [COMPLETE]: (<CompleteScreen />)
};

export const gameDifficulty = {
  EASY: "easy",
  HARD: "hard",
  MEDIUM: "medium",
};

const useGameStatus = ({
  answers,
  initialStatus,
  questions,
  setStartTime,
  setScore,
  setEndTime,
}) => {
  const [gameStatus, setGameStatus] = React.useState(initialStatus);
  const gameStatusEffects = {
    [PLAY]: () => {
      const now = Date.now()
      setStartTime(now);
    },
    [SCORING]: () => {
      const now = Date.now()
      setEndTime(now);
      const score = questions.filter((q, i) => {
        return (q.a * q.b) === answers[i]
      }).length / NUM_ROUNDS * 100
      setScore(score)
      setGameStatus(COMPLETE)
    },
  }

  React.useEffect(() => {
    if(gameStatusEffects[gameStatus]){
      gameStatusEffects[gameStatus]()
    }
  }, [gameStatus]);
  return [gameStatus, setGameStatus];
}

const useGameData = ({
    difficulty,
    endTime,
    score,
    startTime
}) => {

  const [gameData, setGameData] = React.useState<ILeaderboardEntry>({
    difficulty,
    endTime,
    name: "",
    score,
    startTime
  })

  React.useEffect(() => {
    setGameData({
      ...gameData,
      endTime
    })
  }, [endTime]);

  React.useEffect(() => {
    setGameData({
      ...gameData,
      score
    })
  }, [score]);

  React.useEffect(() => {
    setGameData({
      ...gameData,
      startTime
    })
  }, [startTime]);

  return [gameData]
}

export const Game = () => {
  const [questions, setQuestions] = React.useState([]);
  const [startTime, setStartTime] = React.useState(0);
  const [endTime, setEndTime] = React.useState(0);
  const [gameRound, setGameRound] = React.useState(0);
  const [answers, setAnswers] = React.useState<number[]>([]);
  const [score, setScore] = React.useState(0);
  const [difficulty, setDifficulty] = React.useState(gameDifficulty.EASY);

  const [gameData] = useGameData({
    difficulty,
    endTime,
    score,
    startTime
  })

  const [gameStatus, setGameStatus] = useGameStatus({
    answers,
    initialStatus: START,
    questions,
    setEndTime,
    setScore,
    setStartTime
  });


  return (
    <GameContext.Provider value={{
      answers,
      difficulty,
      endTime,
      gameData,
      gameRound,
      gameStatus,
      questions,
      score,
      setAnswers,
      setDifficulty,
      setEndTime,
      setGameRound,
      setGameStatus,
      setQuestions,
      setScore,
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
