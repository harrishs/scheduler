import React, { useEffect, useReducer } from "react";
import axios from "axios";
import reducer, {
  SET_DAY,
  SET_APPLICATION_DATA,
  SET_INTERVIEW,
  SET_REMAININGSPOTS
} from "../reducers/application";

export default function useApplicationData(props) {
  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  function updateObjectInArray(array, action) {
    return array.map((item, index) => {
      if (index !== action.index) {
        // This isn't the item we care about - keep it as-is
        return item;
      }

      // Otherwise, this is the one we want - return an updated value
      return {
        ...item,
        spots: action.item
      };
    });
  }

  const setDay = day => dispatch({ type: SET_DAY, day });
  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ]).then(all => {
      dispatch({
        type: SET_APPLICATION_DATA,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data
      });
    });
  }, []);

  //Book interview function to setState
  function bookInterview(id, interview, bool) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    let dayID;
    function getDayID(id) {
      state.days.forEach((element, index) => {
        if (element.appointments.includes(id)) {
          dayID = index;
          return index;
        }
      });
    }
    getDayID(id);
    let days = updateObjectInArray(state.days, {
      index: dayID,
      item: state.days[dayID].spots - 1
    });

    if (bool === true) {
      dispatch({ type: SET_REMAININGSPOTS, days });
    }

    return axios.put(`/api/appointments/${id}`, { interview }).then(() => {
      dispatch({ type: SET_INTERVIEW, appointments });
    });
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    let dayID;
    function getDayID(id) {
      state.days.forEach((element, index) => {
        if (element.appointments.includes(id)) {
          dayID = index;
          return index;
        }
      });
    }
    getDayID(id);
    let days = updateObjectInArray(state.days, {
      index: dayID,
      item: state.days[dayID].spots + 1
    });

    dispatch({ type: SET_REMAININGSPOTS, days });

    return axios
      .delete(`/api/appointments/${id}`, { data: null })
      .then(() => dispatch({ type: SET_INTERVIEW, appointments }));
  }

  return { state, setDay, bookInterview, cancelInterview };
}
