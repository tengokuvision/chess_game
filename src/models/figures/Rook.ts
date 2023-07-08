import { Figure, FigureNames } from './Figure'
import { Colors } from '../Colors'
import { Cell } from '../Cell'
import blackLogo from '../../assets/Rb.svg'
import whiteLogo from '../../assets/Rw.svg'

export class Rook extends Figure {
	isMoved: boolean = false

	constructor(color: Colors, cell: Cell) {
		super(color, cell)
		this.logo = color === Colors.BLACK ? blackLogo : whiteLogo
		this.name = FigureNames.ROOK
	}

	canMove(target: Cell): boolean {
		this.isMoved = true
		if (!super.canMove(target)) return false
		if (this.cell.isEmptyVertical(target)) return true
		if (this.cell.isEmptyHorizontal(target)) return true
		return false
	}

	canAttack(target: Cell): boolean {
		if (this.canMove(target)) return true
		return false
	}
}
