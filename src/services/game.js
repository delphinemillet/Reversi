import { WHITE, BLACK, EMPTY, UNKNOWN } from "../constants/gameStates";

export default {
  cols: Array(...Array(8)),
  rows: Array(...Array(8)),
  state: [],

  // INITIALIZATION
  initGame() {
    this.rows.map((row, i) => {
      this.state[i] = []
      this.rows.map(() => this.state[i].push(EMPTY))
    })

    this.setState(3, 3, WHITE)
    this.setState(3, 4, BLACK)
    this.setState(4, 3, BLACK)
    this.setState(4, 4, WHITE)

    this.setPlayer(BLACK)
  },

  // TILE
  isInsideBounds(value) {
    return value >=0 && value <= 7
  },

  setState(i, j, state) {
    this.state[i].splice(j, 1, state)
  },

  getState(i, j) {
    return this.isInsideBounds(i) && this.isInsideBounds(j) ? this.state[i][j] : UNKNOWN
  },

  isValid(i, j) {
    const opponent = this.getOpponent()
    return this.getState(i, j) === EMPTY
      ? this.getState(i - 1, j) === opponent
        || this.getState(i + 1, j) === opponent
        || this.getState(i + 1, j) === opponent
        || this.getState(i, j - 1) === opponent
        || this.getState(i, j + 1) === opponent
      : false
  },

  // PLAYERS
  setPlayer(player) {
    this.currentPlayer = player
  },

  getOpponent() {
    return this.currentPlayer === BLACK ? WHITE : BLACK
  },

  // GAME
  play(i, j) {
    if(this.isValid(i, j)) {
      this.setState(i, j, this.currentPlayer)
      this.setPlayer(this.getOpponent())
    }
  }
};