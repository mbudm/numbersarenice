import { ILeaderboardEntry } from "../common/leaderboard/getLeaderboardData";
import { COMPLETE, gameDifficulty, NUM_ROUNDS, PLAY, START } from "./constants";

export const actions = {
  COMPLETE_GAME: "COMPLETE",
  RESET_GAME: "RESET_GAME",
  SAVE_NAME: "SAVE_NAME",
  START_GAME: "START_GAME",
  SUBMIT_ANSWER: "SUBMIT_ANSWER",
}

const handlers = {
  [actions.RESET_GAME]: (state) => ({
    ...state,
    answers: [],
    gameData: {
      ...state.gameData,
      endTime: 0,
      score: 0,
      startTime: 0
    },
    questions: [],
    round: 0,
    status: START
  }),
  [actions.SAVE_NAME]: (state, action) => ({
    ...state,
    gameData: {
      ...state.gameData,
      name: action.payload
    }
  }),
  [actions.START_GAME]: (state) => {
    const newStartTime = Date.now()
    const newStatus = PLAY
    return {
      ...state,
      gameData: {
        ...state.gameData,
        startTime: newStartTime
      },
      questions: generateQuestions(),
      status: newStatus
    }
  },
  [actions.SUBMIT_ANSWER]: (state, action) => {
    const newAnswers:number[] = [...state.answers]
    if (state.round === newAnswers.length) {
      newAnswers.push(action.payload * 1)
    } else {
      newAnswers[state.round] = action.payload * 1
    }
    let newRound = state.round
    let newStatus =  state.status
    let newEndTime = state.gameData.endTime
    if (newAnswers.length < NUM_ROUNDS) {
      newRound = state.round + 1
    } else {
      newStatus = COMPLETE
      newEndTime = Date.now()
    }
    return {
      ...state,
      answers: newAnswers,
      gameData: {
        ...state.gameData,
        endTime: newEndTime
      },
      round: newRound,
      status: newStatus
    }
  },
}

export function reducer(state, action) {
  if(handlers[action.type] instanceof Function){
    return handlers[action.type](state, action)
  } else {
    throw new Error(`No handler for ${action.type} action`);
  }
}

export interface ITimesTableQuestion {
  a: number
  b: number
}

export interface ITimesTableSpeedState {
  status: string
  gameData: ILeaderboardEntry
  questions: ITimesTableQuestion[]
  answers: number[]
  round: 0
}

export const initialState: ITimesTableSpeedState = {
  answers: [],
  gameData: {
    difficulty: gameDifficulty.EASY,
    endTime: 0,
    name: "",
    score: 0,
    startTime: 0
  },
  questions: [],
  round: 0,
  status: START,
}

const generateQuestions = () =>
  Array.from({ length: NUM_ROUNDS }).map(() => ({
    // tslint:disable-next-line:insecure-random
    a: Math.ceil(Math.random() * 12),
    // tslint:disable-next-line:insecure-random
    b: Math.ceil(Math.random() * 12),
  }))
