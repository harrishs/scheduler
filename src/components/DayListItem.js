import React from "react";
import classnames from "classnames";

import "components/DayListItem.scss";

export default function DayListItem(props) {
  function formatSpots(props) {
    const spots =
      props.spots === 0
        ? "no spots remaining"
        : props.spots === 1
        ? "1 spot remaining"
        : props.spots
        ? `${props.spots} spots remaining`
        : null;
    return spots;
  }

  const dayClass = classnames("day-list", {
    "day-list__item": true,
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0
  });
  return (
    <li
      className={dayClass}
      onClick={() => props.setDay(props.name)}
      data-testid="day"
    >
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props)}</h3>
    </li>
  );
}
DayListItem.exports = DayListItem;
