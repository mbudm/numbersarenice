import Card from "@material-ui/core/Card";
import * as React from "react";

import { ILeaderboardEntry } from "../common/leaderboard/getLeaderboardData";
import { CompleteScreen } from "./CompleteScreen";
import { GameHeader } from "./GameHeader";
import { PlayScreen } from "./PlayScreen";
import { StartScreen } from "./StartScreen";

export const GameContext = React.createContext(null);

export const START = "START"
export const PLAY = "PLAY"
export const COMPLETE = "COMPLETE"
export const NUM_ROUNDS = 2
export const GAME_KEY = "nn_tt_speed" // for localstorage

const gameScreens = {
  [START]: (<StartScreen />),
  [PLAY]: (<PlayScreen />),
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
    [COMPLETE]: () => {
      const now = Date.now()
      setEndTime(now);
      const score = questions.filter((q, i) => {
        return (q.a * q.b) === answers[i]
      }).length / NUM_ROUNDS * 100
      setScore(score)
    }
  }

  React.useEffect(() => {
    if(gameStatusEffects[gameStatus]){
      gameStatusEffects[gameStatus]()
    }
  }, [gameStatus]);
  return [gameStatus, setGameStatus];
}

const useScore = ({
    gameData,
    setGameData
}) => {
  const [score, setScore] = React.useState(0)
  React.useEffect(() => {
    setGameData({
      ...gameData,
      score
    })
  }, [score]);
  return [score, setScore]
}

const useStartTime = ({
  gameData,
  setGameData
}) => {
const [startTime, setStartTime] = React.useState(0)
React.useEffect(() => {
  setGameData({
    ...gameData,
    startTime
  })
}, [startTime]);
return [startTime, setStartTime]
}

const useEndTime = ({
  gameData,
  setGameData
}) => {
const [endTime, setEndTime] = React.useState(0)
React.useEffect(() => {
  setGameData({
    ...gameData,
    endTime
  })
}, [endTime]);
return [endTime, setEndTime]
}

const useDifficulty = ({
  gameData,
  setGameData
}) => {
const [difficulty, setDifficulty] = React.useState(gameDifficulty.EASY)
React.useEffect(() => {
  setGameData({
    ...gameData,
    difficulty
  })
}, [difficulty]);
return [difficulty, setDifficulty]
}

export const Game = () => {
  const [questions, setQuestions] = React.useState([]);
  const [gameRound, setGameRound] = React.useState(0);
  const [answers, setAnswers] = React.useState<number[]>([]);
  const [gameData, setGameData] = React.useState<ILeaderboardEntry>({
    difficulty: '',
    endTime: 0,
    name: "",
    score: 0,
    startTime: 0
  })

  const [startTime, setStartTime] = useStartTime({
    gameData,
    setGameData
  });

  const [endTime, setEndTime] = useEndTime({
    gameData,
    setGameData
  });

  const [score, setScore] = useScore({
    gameData,
    setGameData
  });

  const [difficulty, setDifficulty] = useDifficulty({
    gameData,
    setGameData
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
