import React, { Component } from 'react';
import Tile from './Tile.js';
import './Grid.css';

class Grid extends Component {
  render() {
    const { grid } = this.props;

    return (
      <div>
        {grid.map((row) => {
          return (
            <div className='row'>
							{row.map((col) => {
								return <Tile>{col}</Tile>
							})}
						</div>
					)
        })}
      </div>
    );
  }
}

export default Grid;
