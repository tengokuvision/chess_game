import { Cell } from './Cell'
import { Colors } from './Colors'
import { Pawn } from './figures/Pawn'
import { King } from './figures/King'
import { Queen } from './figures/Queen'
import { Bishop } from './figures/Bishop'
import { Knight } from './figures/Knight'
import { Rook } from './figures/Rook'
import { Figure, FigureNames } from './figures/Figure'

export class Board {
	cells: Cell[][] = []
	lostBlackFigures: Figure[] = []
	lostWhiteFigures: Figure[] = []

	public initCells() {
		for (let i = 0; i < 8; i++) {
			const row: Cell[] = []
			for (let j = 0; j < 8; j++) {
				if ((i + j) % 2 !== 0) {
					row.push(new Cell(this, j, i, Colors.BLACK, null))
				} else {
					row.push(new Cell(this, j, i, Colors.WHITE, null))
				}
			}
			this.cells.push(row)
		}
	}

	public getFiguresByColor(color: Colors): Figure[] {
		let figures: Figure[] = []
		for (let i = 0; i < 8; i++) {
			for (let j = 0; j < 8; j++) {
				const cell = this.cells[i][j]
				if (cell.figure && cell.figure.color === color) {
					figures.push(cell.figure)
				}
			}
		}
		return figures
	}

	public getCopyBoard(): Board {
		const newBoard = new Board()
		newBoard.cells = this.cells
		newBoard.lostWhiteFigures = this.lostWhiteFigures
		newBoard.lostBlackFigures = this.lostBlackFigures
		return newBoard
	}

	public highlightCells(selectedCell: Cell | null) {
		for (let i = 0; i < this.cells.length; i++) {
			const row = this.cells[i]
			for (let j = 0; j < row.length; j++) {
				const target = row[j]
				target.available = !!selectedCell?.figure?.canMove(target)
			}
		}
	}

	public getAttackers(target: Cell, attackerColor: Colors): Figure[] {
		let attackers: Figure[] = []
		for (let y = 0; y < 8; y++) {
			for (let x = 0; x < 8; x++) {
				const cell = this.getCell(x, y)
				if (cell.figure && cell.figure.color === attackerColor && cell.figure.canAttack(target)) {
					attackers.push(cell.figure)
				}
			}
		}
		return attackers
	}

	public getKingByColor(color: Colors): King | null {
		for (let i = 0; i < 8; i++) {
			for (let j = 0; j < 8; j++) {
				const cell = this.cells[i][j]
				if (cell.figure && cell.figure.name === FigureNames.KING && cell.figure.color === color) {
					return cell.figure as King
				}
			}
		}
		return null
	}

	public isKingInCheck(color: Colors): boolean {
		const king = this.getKingByColor(color)

		if (king) {
			return king.isUnderAttack(king.cell) !== null
		}
		return false
	}

	public getCell(x: number, y: number) {
		return this.cells[y][x]
	}

	private addPawns() {
		for (let i = 0; i < 8; i++) {
			new Pawn(Colors.BLACK, this.getCell(i, 1))
			new Pawn(Colors.WHITE, this.getCell(i, 6))
		}
	}

	private addKings() {
		new King(Colors.BLACK, this.getCell(4, 0))
		new King(Colors.WHITE, this.getCell(4, 7))
	}

	private addQueens() {
		new Queen(Colors.BLACK, this.getCell(3, 0))
		new Queen(Colors.WHITE, this.getCell(3, 7))
	}

	private addBishops() {
		new Bishop(Colors.BLACK, this.getCell(2, 0))
		new Bishop(Colors.BLACK, this.getCell(5, 0))
		new Bishop(Colors.WHITE, this.getCell(2, 7))
		new Bishop(Colors.WHITE, this.getCell(5, 7))
	}

	private addKnights() {
		new Knight(Colors.BLACK, this.getCell(1, 0))
		new Knight(Colors.BLACK, this.getCell(6, 0))
		new Knight(Colors.WHITE, this.getCell(1, 7))
		new Knight(Colors.WHITE, this.getCell(6, 7))
	}

	private addRooks() {
		new Rook(Colors.BLACK, this.getCell(0, 0))
		new Rook(Colors.BLACK, this.getCell(7, 0))
		new Rook(Colors.WHITE, this.getCell(0, 7))
		new Rook(Colors.WHITE, this.getCell(7, 7))
	}

	// public addFisherFigures() {
	//
	// }

	public addFigures() {
		this.addPawns()
		this.addKnights()
		this.addKings()
		this.addBishops()
		this.addQueens()
		this.addRooks()
	}
}