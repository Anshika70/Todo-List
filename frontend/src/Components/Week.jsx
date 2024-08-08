import style from "./Week.module.css";

function Week({ selectedDay, setSelectedDay }) {
  // Array representing the days of the week
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className={style.weekRow}>
      {daysOfWeek.map((day, index) => (
        <div
          key={index} // Unique key for each day to help React identify the elements
          className={`${style.circle} ${
            selectedDay === day ? style.selected : ""
          }`} // Apply styling conditionally based on whether the day is selected
          onClick={() => setSelectedDay(day)}
        >
          {day}
        </div>
      ))}
    </div>
  );
}

export default Week;
