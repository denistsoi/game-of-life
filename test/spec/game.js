
const Game = require('../../src/game');

const expect = require('expect');
const chai   = require('chai');
const should = require('chai').should();


describe('game', () => {
  it('should create a board based on width and height', () => {
    let game = new Game(6,5);

    expect(game.width).toEqual(6);
    expect(game.height).toEqual(5);
  });

  it('should render status of start game based on random board', () => {
    let game = new Game(4,4);
    expect(game._board.length).toEqual(4);
  })
})