
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
      game.getState(0, 0)
      expect(game.state[0][0]).toEqual('EMPTY')
      expect(game.state[3][3]).toEqual('WHITE')
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

  describe('setPlayer()', () => {
    it("should set the current player", () => {
      game.setPlayer("toto")
      expect(game.currentPlayer).toEqual("toto")
    })
  })

  describe('getOpponent()', () => {
    it("should return the BLACK'S opponent", () => {
      expect(game.getOpponent()).toEqual("WHITE")
    })
    it("should return the WHITE'S opponent", () => {
      game.setPlayer('WHITE')
      expect(game.getOpponent()).toEqual("BLACK")
    })
  })

  describe('play()', () => {
    it('should do nothing if move is not valid', () => {
      game.play(0,0)
      expect(game.state).toMatchSnapshot()
      expect(game.currentPlayer).toEqual('BLACK')
    })
    it('should set the player\'s tile and update the current player', () => {
      game.play(3,2)
      expect(game.state).toMatchSnapshot()
      expect(game.currentPlayer).toEqual('WHITE')
    })
  })
})
