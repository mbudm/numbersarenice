import { ILeaderboardEntry } from "../common/leaderboard/getLeaderboardData"
import {
  COMPLETE,
  GAME_DIFFICULTY_INIT,
  gameDifficulty,
  NUM_ROUNDS_INIT,
  PLAY,
  START,
} from "./constants"

export const actions = {
  CHANGE_DIFFICULTY: "CHANGE_DIFFICULTY",
  CHANGE_ROUNDS: "CHANGE_ROUNDS",
  COMPLETE_GAME: "COMPLETE",
  RESET_GAME: "RESET_GAME",
  SAVE_NAME: "SAVE_NAME",
  START_GAME: "START_GAME",
  SUBMIT_ANSWER: "SUBMIT_ANSWER",
}

const handlers = {
  [actions.RESET_GAME]: state => ({
    ...state,
    answers: [],
    gameData: {
      ...state.gameData,
      endTime: 0,
      score: 0,
      startTime: 0,
    },
    questions: [],
    round: 0,
    status: START,
  }),
  [actions.SAVE_NAME]: (state, action) => ({
    ...state,
    gameData: {
      ...state.gameData,
      name: action.payload,
    },
  }),
  [actions.START_GAME]: state => {
    const newStartTime = Date.now()
    const newStatus = PLAY
    return {
      ...state,
      gameData: {
        ...state.gameData,
        startTime: newStartTime,
      },
      questions: generateQuestions(state.rounds, state.difficulty),
      status: newStatus,
    }
  },
  [actions.SUBMIT_ANSWER]: (state, action) => {
    const newAnswers: number[] = [...state.answers]
    if (state.round === newAnswers.length) {
      newAnswers.push(action.payload * 1)
    } else {
      newAnswers[state.round] = action.payload * 1
    }
    let newRound = state.round
    let newStatus = state.status
    let newEndTime = state.gameData.endTime
    let newScore = state.gameData.score
    if (newAnswers.length < state.rounds) {
      newRound = state.round + 1
    } else {
      newStatus = COMPLETE
      newEndTime = Date.now()
      newScore =
        (state.questions.filter((q, i) => {
          return q.a * q.b === newAnswers[i]
        }).length /
          state.rounds) *
        100
    }
    return {
      ...state,
      answers: newAnswers,
      gameData: {
        ...state.gameData,
        endTime: newEndTime,
        score: newScore,
      },
      round: newRound,
      status: newStatus,
    }
  },
  [actions.CHANGE_DIFFICULTY]: (state, action) => {
    const newDifficulty: number = action.payload * 1
    return {
      ...state,
      difficulty: newDifficulty,
      gameData: {
        ...state.gameData,
        difficulty: gameDifficulty[newDifficulty].label,
      },
    }
  },
  [actions.CHANGE_ROUNDS]: (state, action) => {
    return {
      ...state,
      rounds: action.payload * 1
    }
  }
}

export function reducer(state, action) {
  if (handlers[action.type] instanceof Function) {
    return handlers[action.type](state, action)
  } else {
    throw new Error(`No handler for ${action.type} action`)
  }
}

export interface ITimesTableQuestion {
  a: number
  b: number
}

export interface ITimesTableSpeedState {
  answers: number[]
  difficulty: number
  gameData: ILeaderboardEntry
  questions: ITimesTableQuestion[]
  round: number
  rounds: number
  status: string
}

export const initialState: ITimesTableSpeedState = {
  answers: [],
  difficulty: GAME_DIFFICULTY_INIT,
  gameData: {
    difficulty: gameDifficulty[GAME_DIFFICULTY_INIT].label,
    endTime: 0,
    name: "",
    score: 0,
    startTime: 0,
  },
  questions: [],
  round: 0,
  rounds: NUM_ROUNDS_INIT,
  status: START,
}

export const generateQuestions = (rounds, difficulty) => {
  const difficultyData =  gameDifficulty[difficulty]

  return Array.from({ length: rounds }).map(() => ({
    // tslint:disable-next-line:insecure-random
    a: difficultyData.a[Math.floor(Math.random() * difficultyData.a.length)],
    // tslint:disable-next-line:insecure-random
    b: difficultyData.b[Math.floor(Math.random() * difficultyData.b.length)],
  }))
}
