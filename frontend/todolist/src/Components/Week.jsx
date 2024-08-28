
import style from "./Week.module.css";

function Week({ selectedDay, setSelectedDay }) {
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className={style.weekRow}>
      {daysOfWeek.map((day, index) => (
        <div
          key={index}
          className={`${style.circle} ${selectedDay === day ? style.selected : ""}`}
          onClick={() => setSelectedDay(day)}
        >
          {day}
        </div>
      ))}
    </div>
  );
}

export default Week;
