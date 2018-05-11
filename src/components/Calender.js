import moment from "moment";
import React, { Component } from "react";
import BigCalendar from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

BigCalendar.momentLocalizer(moment);

export default class Calender extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dates: [],
      trainings: []
    };
  }

  componentDidMount() {
    this.loadTrainings();
  }

  loadTrainings = () => {
    fetch('https://customerrest.herokuapp.com/gettrainings')
      .then(res => res.json())
      .then(resJson => {
        this.setState({
          trainings: resJson
        })
        console.log("Data loaded!", this.state.trainings)
        this.mapTrainings();
      })
      .catch(err => {
        console.warn("Computer machine broke: ", err)
      })
  }

  mapTrainings = () => {
    let allViews = [];
    for (let i = 0; i < this.state.trainings.length; i++) {
      allViews[i] = {
        id: i,
        title: `${this.state.trainings[i].activity}: ${this.state.trainings[i].customer.firstname} ${this.state.trainings[i].customer.lastname}`,
        allDay: false,
        start: new Date(this.state.trainings[i].date),
        // Below formula converts minutes to milliseconds and adds to start date to caluclate end date
        end: new Date(this.state.trainings[i].date + (this.state.trainings[i].duration * 60000))
      }
    }
    this.setState({
      dates: [...allViews]
    })
  }
  render() {
    let allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k])
    return (
      <div style={{ height: 800 }}>
        <BigCalendar
          events={this.state.dates}
          views={allViews}
          startAccessor="start"
          endAccessor="end"
          step={30}
        />
      </div>
    );
  }
}
