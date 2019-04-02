import React from "react"
import * as Time from "../lib/Time"
import * as d3 from "d3"

const FORMAT = "HH:mm"

const times = d3.timeMinute
  .every(30)
  .range(new Date(1990, 9, 16, 0, 0, 0), new Date(1990, 9, 17, 0, 0, 0))
  .map(d => Time.format(d, FORMAT))

type Props = {
  time: Date,
  onTimeChange: Function
}
type State = {
  isOpen: boolean,
  value: string
}

export default class TimePicker extends React.Component<Props, State> {
  input: ?HTMLInputElement
  timesList: ?HTMLElement

  constructor(props: Props) {
    super(props)

    this.state = {
      isOpen: false,
      value: formatTime(this.props.time)
    }
  }

  focus() {
    this.input && this.input.focus()
  }

  blur() {
    this.input && this.input.blur()
  }

  UNSAFE_componentWillReceiveProps(props: Props) {
    this.setState({value: formatTime(props.time)})
  }

  componentDidUpdate() {
    this.scrollToSelectedTime()
  }

  onFocus = () => {
    this.setState({isOpen: true})
  }

  onBlur = () => {
    this.setState({isOpen: false})
    this.attemptCallback(this.state.value)
  }

  onTimeClick(timeString: string) {
    this.setState({isOpen: false})
    this.attemptCallback(timeString)
  }

  onInputClick = () => {
    this.setState({isOpen: true})
  }

  onInputChange = (e: SyntheticEvent<HTMLInputElement>) => {
    this.setState({value: e.currentTarget.value})
  }

  scrollToSelectedTime() {
    const intervalInMinutes = 30
    const heightOfItem = 40
    const {time} = this.props
    const {minutes} = Time.toObject(time)
    const remainder = intervalInMinutes - (minutes % intervalInMinutes)
    const roundTime =
      remainder !== intervalInMinutes
        ? Time.add(time, remainder, "minutes")
        : time
    const index = times.indexOf(Time.format(roundTime, FORMAT)) - 2

    if (this.state.isOpen && index >= 0 && this.timesList) {
      this.timesList.scrollTop = heightOfItem * index
    }
  }

  attemptCallback(selectedValue: string) {
    const newTime = parseTime(selectedValue)

    if (!newTime) {
      this.setState({value: formatTime(this.props.time)})
      return
    }

    const newValue = formatTime(newTime)
    const oldValue = formatTime(this.props.time)

    this.setState({value: newValue})

    if (newValue !== oldValue) {
      const {hours, minutes} = Time.toObject(newTime)
      this.props.onTimeChange({
        hours,
        minutes
      })
    }
  }

  renderTimes() {
    const timeItems = times.map(time => (
      <li key={time} onClick={() => this.onTimeClick(time)}>
        {time}
      </li>
    ))

    return (
      <div
        onMouseDown={e => e.preventDefault()}
        ref={r => (this.timesList = r)}
        className="context-menu"
      >
        {timeItems}
      </div>
    )
  }

  render() {
    return (
      <div className="time-picker">
        <input
          className="time-input"
          type="text"
          size="5"
          ref={r => (this.input = r)}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          value={this.state.value}
          onChange={this.onInputChange}
          onClick={this.onInputClick}
        />
        {this.state.isOpen && this.renderTimes()}
      </div>
    )
  }
}

const formatTime = date => Time.format(date, FORMAT)
const parseTime = string => Time.parse(string, FORMAT)
