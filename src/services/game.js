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
    return this.isInBounds(i, j) ? this.state[i][j] : null
  },

  isInBounds(i, j) {
    return i >= 0 && i < SIZE && j >= 0 && j < SIZE
  },

  // PLAYERS
  setPlayer(player) {
    this.currentPlayer = player
  },

  getOpponent() {
    return this.currentPlayer === BLACK ? WHITE : BLACK
  },


  // GAME
  // check if the move is valid
  isValid(i, j) {
    if(this.getState(i, j) !== EMPTY) return false

    // check tile state for each possible direction from the current move
    for(let x = -1; x <= 1; x++) {
      for(let y = -1; y <= 1; y++) {
        let nextRow = i + x
        let nextCol  = j + y
        if(this.isOk(nextRow, nextCol, x, y)) return true
      }
    }
    return false
  },

  // check if the move is bounding opponent's tiles with
  isOk(nextRow, nextCol, x, y) {
    let opponentFound = false
    // check if adjascent tile belong to the opponent
    while(this.getState(nextRow, nextCol) === this.getOpponent()) {
      opponentFound = true
      nextRow += x
      nextCol += y
    }

    if(opponentFound) {
      // check if the tile next to the opponent one belongs to the current player
      if(this.getState(nextRow, nextCol) === this.currentPlayer) return true
    }
    return false
  },

  switchTiles(i, j) {
    this.setState(i, j, this.currentPlayer)
    for(let x = -1; x <= 1; x++) {
      for(let y = -1; y <= 1; y++) {
        let nextRow = i + x
        let nextCol  = j + y
        let possibleSwitch = []
        let toSwitch = []
        while(this.getState(nextRow, nextCol) === this.getOpponent()) {
          possibleSwitch.push([nextRow, nextCol])
          nextRow += x
          nextCol += y
        }
        possibleSwitch.forEach(position => {
          if(this.isOk(...position, x, y)) toSwitch.push(position)
        });
        toSwitch.forEach(position => this.setState(...position, this.currentPlayer))
      }
    }
  },

  play(i, j) {
    if(this.isValid(i, j)) {
      console.log("YES")
      this.switchTiles(i, j)
      this.setPlayer(this.getOpponent())
    } else {
      console.log("NO")
    }

  }
};