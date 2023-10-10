import React, { useState, useEffect } from 'react';

const Home = () => {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState([]);

  function handleTask(event) {
    setInputValue(event.target.value);
  }

  function handleTaskList(event) {
    if (event.key === "Enter") {
      if (inputValue.trim() !== "") {
        setTodos([...todos, inputValue.trim()]);
        setInputValue("");
      }
    }
  }

  function lista (index) {
    let filterTask = todos.filter((item, indexFilter) => index !== indexFilter);
    setTodos(filterTask);
  }

  useEffect(() => {
    // Update your todo list with an API call whenever todos change
    fetch('https://playground.4geeks.com/apis/fake/todos/user/biancadmsa', {
      method: "PUT",
      body: JSON.stringify(todos),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(resp => resp.json())
      .then(data => {
        console.log("Todo list updated:", data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, [todos]); // Run this effect whenever todos change

  return (
    <div className="container">
      <h1>My Todos</h1>
      <ul>
        <li>
          <input
            type="text"
            maxLength="38"
            onChange={handleTask}
            value={inputValue}
            onKeyDown={handleTaskList}
            placeholder="What needs to be done?"
          />
        </li>
        {todos.map((item, index) => (
          <li key={index}>
            {item}
            <span>
              <i
                className="fa-solid fa-xmark"
                onClick={() => lista(index)}
              ></i>
            </span>
          </li>
        ))}
      </ul>
      <div>{todos.length} Item</div>
    </div>
  );
};

export default Home;
