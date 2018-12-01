import { WHITE, BLACK, EMPTY, SIZE } from "../constants/gameStates";

export default {
  cols: Array(...Array(8)),
  rows: Array(...Array(8)),
  state: [],

  // INITIALIZATION
  initGame() {
    this.state = Array(SIZE).fill([]).map(() =>
      Array(SIZE).fill(EMPTY)
    )

    this.setState(3, 3, WHITE)
    this.setState(3, 4, BLACK)
    this.setState(4, 3, BLACK)
    this.setState(4, 4, WHITE)

    this.setPlayer(BLACK)
  },

  // TILE
  setState(i, j, state) {
    this.state[i].splice(j, 1, state)
  },

  getState(i, j) {
    return this.state[i][j]
  },

  isInBounds(i, j) {
    return i >= 0 && i < SIZE && j >= 0 && j < SIZE
  },

  isValid(i, j) {
    if(this.getState(i, j) !== EMPTY) return false

    // check tile state for each possible direction from the current move
    for(let x = -1; x <= 1; x++) {
      for(let y = -1; y <= 1; y++) {
        let nextRow = i + x;
        let nextCol  = j + y
        let opponentFound = false

        // check if adjascent tile belong to the opponent
        while(this.isInBounds(nextRow, nextCol) && this.getState(nextRow, nextCol) === this.getOpponent()) {
          opponentFound = true
          nextRow += x
          nextCol += y
        }

        if(opponentFound) {
          // check if the tile next to the opponent one belongs to the current player
          if(this.getState(nextRow, nextCol) === this.currentPlayer) return true
        }
      }
    }
    return false
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
      console.log("YES")
      this.setState(i, j, this.currentPlayer)
      this.setPlayer(this.getOpponent())
    } else {
      console.log("NO")
    }

  }
};