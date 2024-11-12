import { Component } from '@angular/core';
import { CellComponent } from "../cell/cell.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [
    CellComponent,
    CommonModule
  ],
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent {
  boardSize: number = 10;
  board: boolean[][]; 
  moves: number[][]; 
  currentMove: number = 0; 
  knightPosition: { row: number; col: number }; 

  constructor() {
    this.board = Array.from({ length: this.boardSize }, () => Array(this.boardSize).fill(false));
    this.moves = Array.from({ length: this.boardSize }, () => Array(this.boardSize).fill(0));
    this.knightPosition = { row: 0, col: 0 };
    this.placeKnight(0, 0);
  }

  placeKnight(row: number, col: number) {
    this.board[row][col] = true;
    this.moves[row][col] = ++this.currentMove;
    this.knightPosition = { row, col };
  }

  moveKnight(newRow: number, newCol: number) {
    const validMoves = this.getValidMoves();
    if (validMoves.some(move => move.row === newRow && move.col === newCol)) {
      // Перемещаем коня
      this.board[this.knightPosition.row][this.knightPosition.col] = false; 
      this.placeKnight(newRow, newCol);
    }
  }

  getValidMoves() {
    const moves = [
      { row: -2, col: -1 }, { row: -1, col: -2 },
      { row: 1, col: -2 }, { row: 2, col: -1 },
      { row: 2, col: 1 }, { row: 1, col: 2 },
      { row: -1, col: 2 }, { row: -2, col: 1 }
    ];
    
    const validMoves = [];
    for (const move of moves) {
      const newRow = this.knightPosition.row + move.row;
      const newCol = this.knightPosition.col + move.col;
      if (this.isInBounds(newRow, newCol)) {
        validMoves.push({ row: newRow, col: newCol });
      }
    }
    return validMoves;
  }

  isInBounds(row: number, col: number) {
    return row >= 0 && row < this.boardSize && col >= 0 && col < this.boardSize;
  }
}
