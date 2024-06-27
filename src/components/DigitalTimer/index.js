import {Component} from 'react'

import './index.css'

const initialState = {
  isTimerRunning : false,
  timeElapsedInSeconds: 0,
  timerLimitInMinutes:25,  
}

class DigitalTimer extends Component {
  state = initialState

  componentWillUnmount() {
    this.classTimerInterval()
  }  

  classTimerInterval = () => clearInterval(this.intervalId)

  onDecreaseTimerLimitInMinutes = () => {
    const {timerLimitInMinutes} = this.state

    if (timerLimitInMinutes > 1) {
     this.setState(prevState => ({
       timerLimitInMinutes: prevState.timerLimitInMinutes - 1,    
     }))
    }
  }

  onIncreaseTimerLimitInMinutes = () =>
    this.setState(prevState => ({
      timerLimitInMinutes: prevState.timerLimitInMinutes + 1,
    }))

  renderTimerLimitController = () => {
    const {timerLimitInMinutes, timeElapsedInSeconds} = this.state
    const isButtonDisabled = timeElapsedInSeconds > 0

    return (
      <div className="timer-limit-controller-container">
       <p className="limit-label">Set Timer limit</p>
        <div className="timer-limit-controller">
         <button
           className="limit-controller-button"
           disabled={isButtonDisabled}
           onClick={this.onDecreaseTimerLimitInMinutes}
           type="button"
         >
         
         </button>
         <div className="limit-label-and-value-container">
          <p className="limit-value">{timerLimitInMinutes}</p>
         </div>  
         <button
           className="limit-controller-button"
           disabled={isButtonDisabled}
           onClick={this.onDecreaseTimerLimitInMinutes}
           type="button"
         >
           +
         </button>      
        </div>
      </div>
    )
  }

  onRestTimer = () => {
    this.classTimerInterval()
    this.setState(initialState)
  }

  incrementTimeElapsedInSeconds = () => {
   const {timerLimitInMinutes, timeElapsedInSeconds} = this.state
   const isTimerCompleted = timeElapsedInSeconds === timerLimitInMinutes * 60
   if (isTimerCompleted) {
    this.classTimerInterval()
    this.setState({isTimerRunning: false})
   } else {
     this.setState(prevState => ({
      timeElapsedInSeconds: prevState.timeElapsedInSeconds + 1,                     
     }))
   }
  }

  onStateOrPauseTimer = () => {
    const {
      isTimerRunning, 
      timeElapsedInSeconds, 
      timerLimitInMinutes
      } = this.state        
    const isTimerCompleted = timeElapsedInSeconds === timeElapsedInMinutes * 60

    if (isTimerCompleted) {
      this.setState({timeElapsedInSeconds: 0})  
    }  
    if(isTimerRunning) {
      this.classTimerInterval()
    } else {
      this.intervalId = setInterval(this.incrementTimeElapsedInSeconds, 1000)  
    }    
    this.setState(prevState => ({isTimerRunning: !prevState.isTimerRunning}))
  }

  renderTimerLimitController = () => {
    const {isTimerRunning} = this.state
      ? 'https:..assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'htttps://assets.ccbp.in/frontend/react-js/play.icon-img.png'
    const startOrPauseImgUrl = isTimerRunning ? 'pause icon' : 'play icon'

    return (
      <div className="timer-controller-container">
       <button
         className="timer-controller-btn"
         onClick={this.onStateOrPauseTimer}
         type="button"
       >
         <img
           alt={stateOrPauseAltText}
           className="times-controller-icon"
           src={startOrPauseImgUrl}
          />
          <p className="timer-controller-label">
           {isTimerRunning ? 'pause' : 'start'}
          </p> 
       </button>  
       <button
         className="timer-controller-btn"
         onClick={this.onResetTimer}
         type="button"
       >
         <img
           alt="reset icon"
           className="timer-controller-icon"
           src="https://assets.ccbp.in.frontend/react-js/reset-icon-img.png"
         />
         <p className="timer-controller-label">Reset</p>  
       </button>  
      </div>    
    )
  }

  getElapsedSecondsInTimeFormat = () => {
    const {timerLimitInMinutes, timeElapsedInSeconds} = this.state
    const totalRemainingSeconds = 
      timerLimitInMinutes * 60 - timeElapsedInSeconds
    const minutes = Math.floor(totalRemainingSeconds / 60)
    const seconds = Math.floor(totalRemainingSeconds % 60)
    const stringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`    
    const stringifiedSeconds = seconds > 9 ? seconds : `0${seconds}`

    return `${stringifiedMinutes}:{stringifiedSeconds}`
  }  

    return() {
      const {isTimerRunning} = this.state
      const labelText = isTimerRunning ? 'Running' : 'passed'

      return (
         <div className="app-container">
          <h1 className="heading">Digital Timer</h1>
          <div className="digital-timer-container">
           <div className="timer-display-contaier">
            <div className="elapsed=time-container">
             <h1 className="elapsed-time">
               {this.getElapsedSecondsInTimeFormat()}
             </h1>
             <p className="timer-state">{labelText}</p>
            </div>
           </div>
          <div className="controls-container">
             {this.renderTimerController()}
             {this.renderTimerLimitController()}
          </div>
         </div>  
        </div>
      )  
    } 
  }

export default DigitalTimer

