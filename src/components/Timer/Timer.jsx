import React, { useState, useEffect, useRef } from 'react'

import './Timer.scss'

const Timer = ({ todos, timerComplited }) => {
  const [[m, s], setTime] = useState([0, 0])
  const [startedTimer, setStartedTimer] = useState(false)
  const [finished, setFinished] = useState(todos.done)

  const intervalRef = useRef(null)

  let startTimer

  if (todos.timer.sec > 0 || todos.timer.min > 0) {
    startTimer = () => {
      if (s === 0) {
        if (m === 0) {
          setFinished(true)
          timerComplited()
        } else {
          setTime([m - 1, 59])
        }
      } else {
        setTime([m, s - 1])
      }
    }
  } else {
    startTimer = () => {
      if (s === 59) {
        setTime([m + 1, 0])
      } else {
        setTime([m, s + 1])
      }
    }
  }

  const started = () => {
    setStartedTimer(true)
  }

  const pauseTimer = () => {
    setStartedTimer(false)
  }

  useEffect(() => {
    if (!startedTimer) return clearInterval(intervalRef.current)
    if (todos.done) {
      clearInterval(intervalRef.current)
      setStartedTimer(false)
    }
    if (finished) {
      clearInterval(intervalRef.current)
      setStartedTimer(false)
      return timerComplited(todos.id)
    }

    intervalRef.current = setInterval(startTimer, 1000)

    return () => clearInterval(intervalRef.current)
  }, [startedTimer, m, s, finished])

  useEffect(() => {
    setTime([todos.timer.min, todos.timer.sec])
  }, [])

  return (
    <span className="description">
      <button
        type="button"
        className={`icon icon-play ${startedTimer ? 'started' : null}`}
        aria-label="play"
        onClick={started}
      />
      <button type="button" className="icon icon-pause" aria-label="pause" onClick={pauseTimer} />
      <span className="timer-text">{`${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`}</span>
    </span>
  )
}

export default Timer
