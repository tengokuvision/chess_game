import React, { FC, useEffect, useRef, useState } from 'react'
import { Player } from '../models/Player'
import { Colors } from '../models/Colors'
import { Figure } from '../models/figures/Figure'

interface LostFiguresProps {
	title: string
	figures: Figure[]
}

interface TimerProps {
	currentPlayer: Player | null
	restart: () => void
}

const Timer: FC<TimerProps> = ({ currentPlayer, restart }) => {
	const [blackTime, setBlackTime] = useState(300)
	const [whiteTime, setWhiteTime] = useState(300)
	const timer = useRef<null | ReturnType<typeof setInterval>>(null)

	useEffect(() => {
		startTimer()
	}, [currentPlayer])

	function startTimer() {
		if (timer.current) {
			clearInterval(timer.current)
		}
		const callback = currentPlayer?.color === Colors.WHITE ? decrementWhiteTimer : decrementBlackTimer
		timer.current = setInterval(callback, 1000)
	}

	function decrementBlackTimer() {
		setBlackTime(prev => prev - 1)
	}
	function decrementWhiteTimer() {
		setWhiteTime(prev => prev - 1)
	}

	const timerFormat = (time: number) => {
		const min = Math.floor(time / 60)
		const sec = time - min * 60
		return `${min > 9 ? min : `0${min}`}:${sec > 9 ? sec : `0${sec}`}`
	}

	const handleRestart = () => {
		setWhiteTime(300)
		setBlackTime(300)
		restart()
	}

	return (
		<div className='timer'>
			{currentPlayer?.color === Colors.WHITE ? (
				<>
					<div className='timer__time timer__time-active'>{timerFormat(blackTime)}</div>
					<div className='timer__time '>{timerFormat(whiteTime)}</div>
				</>
			) : (
				<>
					<div className='timer__time timer__time-active'>{timerFormat(whiteTime)}</div>
					<div className='timer__time '>{timerFormat(blackTime)}</div>
				</>
			)}

			<button onClick={handleRestart}>Restart game</button>
		</div>
	)
}

export default Timer
