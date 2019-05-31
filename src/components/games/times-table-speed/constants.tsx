export const START = "START";
export const PLAY = "PLAY";
export const COMPLETE = "COMPLETE";
export const NUM_ROUNDS_INIT = 10;
export const NUM_ROUNDS_MAX = 20;
export const NUM_ROUNDS_MIN = 5;
export const GAME_KEY = "nn_tt_speed"; // for localstorage

export const gameDifficulty = [{
  a: [1,2,3,5,10],
  b: [1,2,3,5,10],
  label: "easy peasy",
},
{
  a: [1,2,3,4,5,10],
  b: [1,2,3,4,5,6,7,8,10],
  label: "getting serious",
},
{
  a: [2,3,4,5,6,7,8,9,10],
  b: [2,3,4,5,6,7,8,9,10,11,12],
  label: "tricky",
},{
  a: [6,7,8,9,11,12],
  b: [6,7,8,9,11,12],
  label: "crazy hard",
}]

export const GAME_DIFFICULTY_INIT = 0
