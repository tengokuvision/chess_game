import React, { FC } from 'react'
import { Cell } from '../models/Cell'
import { Player } from '../models/Player'
import { Colors } from '../models/Colors'

interface CellProps {
	cell: Cell
	selected: boolean
	click: (cell: Cell) => void
	currentPlayer: Player | null
}

const CellComponent: FC<CellProps> = ({
	cell,
	selected,
	click,
	currentPlayer,
}) => {
	return (
		<div
			className={['cell', cell.color, selected ? 'selected' : ''].join(' ')}
			onClick={() => click(cell)}
			style={{
				background: cell.available && cell.figure ? 'green' : '',
				transform:
					currentPlayer?.color === Colors.WHITE
						? 'rotate(0deg)'
						: 'rotate(180deg)',
			}}
		>
			{cell.available && !cell.figure && <div className={'available'} />}
			{cell.figure?.logo && <img src={cell.figure.logo} alt='' />}
		</div>
	)
}

export default CellComponent
