export default {
  cols: Array(...Array(8)),
  rows: Array(...Array(8)),
  state: [],

  initGame() {
    this.rows.map((row, i) => {
      this.state[i] = []
      this.rows.map(() => this.state[i].push('EMPTY'))
    })

    this.state[3][3] = 'WHITE'
    this.state[3][4] = 'BLACK'
    this.state[4][3] = 'BLACK'
    this.state[4][4] = 'WHITE'
  },

  getState(i, j) {
    return this.state[i][j]
  }
};