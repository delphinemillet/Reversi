
import game from "../../src/services/game"

describe('game service', () => {
  beforeEach(() => {
    game.initGame()
  })

  describe('initGame()', () => {
    it("should init the board", () => {
      expect(game.state).toMatchSnapshot()
    })
    it("should set the current player to BLACK", () => {
      expect(game.currentPlayer).toEqual('BLACK')
    })
  })

  describe('setState()', () => {
    it("should update the tile state on a given position", () => {
      game.setState(0, 0, 'value')
      expect(game.state[0][0]).toEqual('value')
    })
  })

  describe('getState()', () => {
    it("should return the tile state for a given position", () => {
      expect(game.getState(0, 0)).toEqual('EMPTY')
      expect(game.getState(3, 3)).toEqual('WHITE')
    })
    it("should return null if thr given position is out of bounds", () => {
      expect(game.getState(-1, 0)).toEqual(null)
      expect(game.getState(3, 8)).toEqual(null)
    })
  })

  describe('isInBounds()', () => {
    it("should return true for inside bounds position", () => {
      expect(game.isInBounds(0, 0)).toBeTruthy()
      expect(game.isInBounds(0, 7)).toBeTruthy()
      expect(game.isInBounds(7, 0)).toBeTruthy()
      expect(game.isInBounds(7, 7)).toBeTruthy()
      expect(game.isInBounds(5, 2)).toBeTruthy()
    })
    it("should return false for position out of bounds", () => {
      expect(game.getState(-1, -1)).toBeFalsy()
      expect(game.getState(8, 8)).toBeFalsy()
      expect(game.getState(2, 8)).toBeFalsy()
      expect(game.getState(-1, 5)).toBeFalsy()
    })
  })

  describe('setPlayer()', () => {
    it("should set the current player", () => {
      game.setPlayer("toto")
      expect(game.currentPlayer).toEqual("toto")
    })
  })

  describe('getOpponent()', () => {
    it("should return the BLACK'S opponent", () => {
      expect(game.getOpponent()).toEqual('WHITE')
    })
    it("should return the WHITE'S opponent", () => {
      game.setPlayer('WHITE')
      expect(game.getOpponent()).toEqual('BLACK')
    })
  })

  describe('getScore()', () => {
    it("should return the score of the current player", () => {
      expect(game.getScore('BLACK')).toEqual(2)
      expect(game.getScore('WHITE')).toEqual(2)
      game.setState(0, 0, 'WHITE')
      expect(game.getScore('WHITE')).toEqual(3)
      expect(game.getScore('BLACK')).toEqual(2)
      game.setState(2, 2, 'WHITE')
      expect(game.getScore('WHITE')).toEqual(4)
      expect(game.getScore('BLACK')).toEqual(2)
    })
  })

  describe('skip()', () => {
    beforeEach(() => {
      game.currentPlayer = 'BLACK'
      game.error = false
    })

    it("should set error and not update current player if he can play", () => {
      expect(game.currentPlayer).toEqual('BLACK')
      expect(game.error).toBeFalsy()

      game.skip()

      expect(game.currentPlayer).toEqual('BLACK')
      expect(game.error).toBeTruthy()
    })

    it("should not set error and update current player if he cannot play", () => {
      // game setup to stuck BLACK
      game.state = Array(8).fill([]).map(() =>
        Array(8).fill('WHITE')
      )
      game.setState(0, 6, 'EMPTY')
      game.setState(0, 7, 'EMPTY')
      for(let i=0; i < 7; i++) game.setState(i, 5, 'BLACK')
      for(let i=0; i < 6; i++) game.setState(7, i, 'BLACK')
      for(let i=1; i < 6; i++) game.setState(0, i, 'BLACK')
      for(let i=1; i < 6; i++) {
        game.setState(i, 6, 'BLACK')
        game.setState(i, 7, 'BLACK')
      }
      game.setState(1, 2, 'BLACK')
      game.setState(1, 4, 'BLACK')
      game.setState(2, 3, 'BLACK')
      game.setState(3, 1, 'BLACK')
      game.setState(6, 4, 'BLACK')
      game.setState(4, 5, 'WHITE')
      game.setState(6, 5, 'WHITE')

      expect(game.currentPlayer).toEqual('BLACK')
      expect(game.error).toBeFalsy()

      game.skip()

      expect(game.currentPlayer).toEqual('WHITE')
      expect(game.error).toBeFalsy()
    })
  })

  describe('isValid()', () => {
    it('should return false if tile is not empty', () => {
      expect(game.isValid(3,3)).toBeFalsy()
    })
    it('should return true if tile is empty and adjacent tile is occupied by opponent', () => {
      expect(game.isValid(3,2)).toBeTruthy()
      expect(game.isValid(2,3)).toBeTruthy()
      expect(game.isValid(5,4)).toBeTruthy()
      expect(game.isValid(4,5)).toBeTruthy()
    })
    it('should return false if tile is empty but not adjacent to opponent tile', () => {
      expect(game.isValid(3,5)).toBeFalsy()
      expect(game.isValid(2,2)).toBeFalsy()
      expect(game.isValid(0,0)).toBeFalsy()
      expect(game.isValid(7,7)).toBeFalsy()
    })
  })

  describe('isOk()', () => {
    it('should return false if move does not close tiles of opponent', () => {
      expect(game.isOk(5, 3, -1, -1)).toBeFalsy()
    })
    it('should return true if move closes tiles of opponent', () => {
      expect(game.isOk(4, 4, -1, 0)).toBeTruthy()
    })
  })

  describe('play()', () => {
    it('should do nothing if move is not valid', () => {
      game.play(0,0)
      expect(game.state).toMatchSnapshot()
      expect(game.currentPlayer).toEqual('BLACK')
    })
    it('should switch the tiles and update the current player', () => {
      game.play(3,2)
      expect(game.state).toMatchSnapshot()
      expect(game.currentPlayer).toEqual('WHITE')
    })
  })
})
