

import React, { useState, useEffect } from "react";
import DateAdd from "./DateAdd";
import SearchBarr from "./Searchbarr";
import Week from "./Week";
import Task from "./Task";
import style from "./BlurBox.module.css";

function BlurBox() {
  const [tasksByDay, setTasksByDay] = useState(() => {
    const savedTasks = localStorage.getItem('tasksByDay');
    return savedTasks ? JSON.parse(savedTasks) : {
      Sun: [],
      Mon: [],
      Tue: [],
      Wed: [],
      Thu: [],
      Fri: [],
      Sat: []
    };
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDay, setSelectedDay] = useState("Sun");

  useEffect(() => {
    const today = new Date().toLocaleString("default", { weekday: "short" });
    setSelectedDay(today);
  }, []);

  useEffect(() => {
    localStorage.setItem('tasksByDay', JSON.stringify(tasksByDay));
  }, [tasksByDay]);

  const addTask = (task) => {
    const updatedTasks = {
      ...tasksByDay,
      [selectedDay]: [...tasksByDay[selectedDay], { ...task, id: Date.now(), completed: false }]
    };
    setTasksByDay(updatedTasks);
  };

  const updateTask = (updatedTask) => {
    const updatedTasks = {
      ...tasksByDay,
      [selectedDay]: tasksByDay[selectedDay].map((task) =>
        task.id === updatedTask.id ? updatedTask : task
      )
    };
    setTasksByDay(updatedTasks);
  };

  const markTaskAsDone = (id) => {
    const updatedTasks = {
      ...tasksByDay,
      [selectedDay]: tasksByDay[selectedDay].map((task) =>
        task.id === id ? { ...task, completed: true } : task
      )
    };
    setTasksByDay(updatedTasks);
  };

  const filteredTasks = tasksByDay[selectedDay].filter((task) =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={style.boxContainer}>
      <SearchBarr setSearchQuery={setSearchQuery} />
      <div className={style.box}></div>
      <DateAdd addTask={addTask} />
      <Week selectedDay={selectedDay} setSelectedDay={setSelectedDay} />
      <div className={style.tasksContainer}>
        {filteredTasks.map((task) => (
          <Task
            key={task.id}
            task={task}
            updateTask={updateTask}
            markTaskAsDone={markTaskAsDone}
          />
        ))}
      </div>
    </div>
  );
}

export default BlurBox;



