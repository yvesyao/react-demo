import React from 'react';
import Square from './Square';
import { calculateWinner } from './utils';

class Board extends React.Component {
  constructor(props, context) {
    // In JavaScript classes, you need to always call super when defining the constructor of a subclass. All React component classes that have a constructor should start it with a super(props) call.
    super(props, context);
    this.state = {
      squares: new Array(9).fill(null),
      nextTurn: 'X',
    };
  }

  handleClick(i) {
    const { nextTurn, squares } = this.state;
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    nextSquares[i] = nextTurn;
    this.setState({
      squares: nextSquares,
      nextTurn: nextTurn === 'X' ? 'O' : 'X',
    });
  }

  renderSquare(i) {
    // To save typing and avoid the confusing behavior of this, we will use the arrow function syntax for event handlers here and further below
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {
    let status;
    const winner = calculateWinner(this.state.squares);
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + this.state.nextTurn;
    }

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

export default Board;
