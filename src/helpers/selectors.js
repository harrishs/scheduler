export function getAppointmentsForDay(state, day) {
  const filter = state.days.find(d => d.name === day);
  if (!filter) {
    return [];
  }
  const final = filter.appointments.map(id => state.appointments[id]);
  return final;
}

export function getInterview(state, interview) {
  let interviewObj = {};
  if (interview === null) return null;

  interviewObj = { student: interview.student };
  const interviewerID = interview.interviewer;

  for (let key in state.interviewers) {
    if (state.interviewers[key].id === interviewerID) {
      interviewObj["interviewer"] = state.interviewers[key];
    }
  }

  return interviewObj;
}
