import React, { useState } from "react";
import Form from "./components/Form";
import Todo from "./components/Todo";
import { nanoid } from "nanoid";


function App(props) {

  const [tasks, setTasks] = useState(props.tasks);


  function addTask(name) {
    const newTask = { id: "todo-" + nanoid(), name: name, completed: false };

    setTasks([...tasks, newTask]);
  }
  

  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map(task => {
      // if this task has the same ID as the edited task
      if (id === task.id) {
        // use object spread to make a new object
        // whose `completed` prop has been inverted
        return {...task, completed: !task.completed}
      }
      return task;
    });
    setTasks(updatedTasks);
  }

  function deleteTask(id) {
    const remainingTasks = tasks.filter(task => id !== task.id);
    setTasks(remainingTasks);
  }
  
  function editTask(id, newName) {
    const editedTaskList = tasks.map(task => {
    // if this task has the same ID as the edited task
      if (id === task.id) {
        //
        return {...task, name: newName}
      }
      return task;
    });
    setTasks(editedTaskList);
  }
  
  
  
  
  const taskList = tasks.map(task => (
    <Todo
        id={task.id}
        name={task.name}
        completed={task.completed}
        key={task.id}
        toggleTaskCompleted={toggleTaskCompleted}
        deleteTask={deleteTask}
        editTask={editTask}
    />
  ));
  

  const tasksNoun = taskList.length !== 1 && taskList.length !== 0 ? 'tasks' : 'task';
  const headingText = `${taskList.length} ${tasksNoun} remaining`;



  return (
    <div className="todoapp stack-large">
      <Form addTask={addTask}/>
      <h2 id="list-heading">{headingText}</h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {taskList}
      </ul>
    </div>
  );
}

export default App;
