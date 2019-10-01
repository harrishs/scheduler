import React, { useState, useEffect } from "react";
import DayList from "components/DayList";
import Appointment from "components/Appointment";
import axios from "axios";

import "components/Application.scss";

const appointments = [
  {
    id: 1,
    time: "12pm"
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png"
      }
    }
  },
  {
    id: 3,
    time: "10pm"
  },
  {
    id: 4,
    time: "2pm",
    interview: {
      student: "Ls Jog",
      interviewer: {
        id: 3,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png"
      }
    }
  },
  {
    id: 5,
    time: "7pm",
    interview: {
      student: "SD Jog",
      interviewer: {
        id: 5,
        name: "Mr Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png"
      }
    }
  }
];

const appointmentList = appointments.map(appointment => {
  return (
    <Appointment
      key={appointment.id}
      id={appointment.id}
      time={appointment.time}
      interview={appointment.interview}
    />
  );
});

export default function Application(props) {
  const [day, setDay] = useState("Monday");
  const [days, setDays] = useState([]);

  useEffect(() => {
    axios
      .get("/api/days")
      .then(response => {
        setDays(response.data);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={days} day={day} setDay={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appointmentList}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
