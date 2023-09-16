import React, { Component } from 'react'

import './Timer.scss'

export default class Timer extends Component {
  constructor() {
    super()
    this.state = {
      taskMin: '',
      taskSec: '',
      startedTimer: false,
      finished: false,
    }
    this.startTimer = () => {
      const { startedTimer, finished } = this.state
      if (startedTimer) {
        return
      }
      this.setState({ startedTimer: true })

      this.timer = setInterval(() => {
        const { taskMin, taskSec } = this.state
        let minLeft = taskMin
        let secLeft = taskSec

        if (finished) {
          this.props.timerComplited()
        }

        if (secLeft === 0) {
          if (minLeft === 0) {
            clearInterval(this.timer)
            this.setState({ startedTimer: false, finished: true })
            this.props.timerComplited()
          } else {
            minLeft -= 1
            secLeft = 59
          }
        } else {
          secLeft -= 1
        }

        this.setState({ taskMin: minLeft, taskSec: secLeft })
      }, 1000)
    }
    this.pauseTimer = () => {
      this.setState({ startedTimer: false })
      clearInterval(this.timer)
    }
  }

  componentDidMount() {
    this.setState({ taskMin: this.props.todo.timer.min, taskSec: this.props.todo.timer.sec })
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  render() {
    const { startedTimer, taskMin, taskSec } = this.state
    return (
      <span className="description">
        <button
          type="button"
          className={`icon icon-play ${startedTimer ? 'started' : null}`}
          aria-label="play"
          onClick={this.startTimer}
        />
        <button type="button" className="icon icon-pause" aria-label="pause" onClick={this.pauseTimer} />
        <span className="timer-text">
          {`${taskMin.toString().padStart(2, '0')}:${taskSec.toString().padStart(2, '0')}`}
        </span>
      </span>
    )
  }
}
