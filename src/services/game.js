import { WHITE, BLACK, EMPTY } from "../constants/gameStates";

export default {
  cols: Array(...Array(8)),
  rows: Array(...Array(8)),
  state: [],

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

  setState(i, j, state) {
    this.state[i].splice(j, 1, state)
  },

  getState(i, j) {
    return this.state[i][j]
  },

  setPlayer(player) {
    this.currentPlayer = player
  },

  play(i, j) {
    const currentPlayer = this.currentPlayer
    this.setState(i, j, currentPlayer)
    this.setPlayer(currentPlayer === BLACK ? WHITE : BLACK)
  }
};