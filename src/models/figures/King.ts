import { Figure, FigureNames } from './Figure'
import { Colors } from '../Colors'
import { Cell } from '../Cell'
import blackLogo from '../../assets/Kb.svg'
import whiteLogo from '../../assets/Kw.svg'

export class King extends Figure {
	constructor(color: Colors, cell: Cell) {
		super(color, cell)
		this.logo = color === Colors.BLACK ? blackLogo : whiteLogo
		this.name = FigureNames.KING
	}

	canMove(target: Cell): boolean {
		if (!super.canMove(target)) return false

		const absX = Math.abs(target.x - this.cell.x)
		const absY = Math.abs(target.y - this.cell.y)

		if (absY <= 1 && absX <= 1 && !this.isUnderAttack(target)) {
			return true
		}

		return false
	}

	canAttack(target: Cell): boolean {
		const absX = Math.abs(target.x - this.cell.x)
		const absY = Math.abs(target.y - this.cell.y)

		if (absY <= 1 && absX <= 1) {
			return true
		}

		return false
	}

	isUnderAttack(target: Cell): Figure | null {
		for (let y = 0; y < 8; y++) {
			for (let x = 0; x < 8; x++) {
				const cell = this.cell.board.getCell(x, y)
				if (cell.figure?.color !== this.color && cell.figure?.canAttack(target)) {
					return cell.figure
				}
			}
		}
		return null
	}
}
