import React, { useEffect, useState } from 'react'
import './App.scss'
import BoardComponent from './components/BoardComponent'
import { Board } from './models/Board'
import { Player } from './models/Player'
import { Colors } from './models/Colors'
import LostFigures from './components/LostFigures'
import Timer from './components/Timer'

const App = () => {
	const [board, setBoard] = useState(new Board())
	const [whitePlayer, setWhitePlayer] = useState(new Player(Colors.WHITE))
	const [blackPlayer, setBlackPlayer] = useState(new Player(Colors.BLACK))
	const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null)

	useEffect(() => {
		restart()
		setCurrentPlayer(whitePlayer)
	}, [])

	useEffect(() => {
		if (currentPlayer) {
			console.log(board.isKingInCheck(currentPlayer.color))
		}
	}, [currentPlayer])

	function restart() {
		const newBoard = new Board()
		newBoard.initCells()
		newBoard.addFigures()
		setBoard(newBoard)
		setCurrentPlayer(whitePlayer)
	}

	function swapPlayer() {
		setCurrentPlayer(currentPlayer?.color === Colors.WHITE ? blackPlayer : whitePlayer)
	}

	return (
		<div className='app'>
			<BoardComponent
				board={board}
				setBoard={setBoard}
				currentPlayer={currentPlayer}
				swapPlayer={swapPlayer}
			/>

			<Timer restart={restart} currentPlayer={currentPlayer} />
			<div>
				<LostFigures title='Black lost pieces:' figures={board.lostBlackFigures} />
				<LostFigures title='White lost pieces:' figures={board.lostWhiteFigures} />
			</div>
		</div>
	)
}

export default App
