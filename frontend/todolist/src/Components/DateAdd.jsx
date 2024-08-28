// DateAdd.js
import { useState } from "react";
import style from "./DateAdd.module.css";

function DateAdd({ addTask }) {
  const [taskTitle, setTaskTitle] = useState("");

  const handleAddTask = () => {
    if (taskTitle.trim()) {
      fetch('http://localhost:5000/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: taskTitle,
          description: "",
          lastUpdated: new Date(),
        }),
      })
        .then(response => response.json())
        .then(newTask => {
          addTask(newTask); // Assuming addTask updates the local state
          setTaskTitle("");
        });
    }
  };

  const today = new Date();
  const day = today.toLocaleString("default", { weekday: "long" });
  const date = today.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className={style.header}>
      <div className={style.date}>
        <h2>{date}</h2>
        <h3>{day}</h3>
      </div>
      <div className={style.inputcontainer}>
        <input
          type="text"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          placeholder="New task..."
        />
        <button className={style.addButton} onClick={handleAddTask}>
          <span>Add Item</span>
        </button>
      </div>
    </div>
  );
}

export default DateAdd;
