export function getAppointmentsForDay(state, day) {
  // const filtered = state.days.filter(d => d.name === day);
  // return filtered;
  const filter = state.days.find(d => d.name === day);
  if (!filter) {
    return [];
  }
  const final = filter.appointments.map(id => state.appointments[id]);
  return final;
}
