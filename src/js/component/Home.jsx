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
        setTodos([...todos, { label: inputValue, done: false }]);
        setInputValue("");
      }
    }
  }



  const getList = async () => {
    try {
      const response = await fetch(
        "https://playground.4geeks.com/apis/fake/todos/user/Biancadmsa"
      );
      const data = await response.json();
      console.log("Todo list:", data);
      setTodos(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    getList();
  }, []);
  
  
  function buttonClear() {
    setTodos([]);
  
    // Envía una solicitud PUT para actualizar todos
    fetch('https://playground.4geeks.com/apis/fake/todos/user/Biancadmsa', {
      method: 'POST',
      body: JSON.stringify([]), 
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(resp => resp.json())
      .then(data => {
        console.log('Todo list cleared:', data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  

  useEffect(() => {
    fetch('https://playground.4geeks.com/apis/fake/todos/user/Biancadmsa', {
      method: "PUT",
      body: JSON.stringify(todos.map((todo) => ({ label: todo.label, done: false }))),
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
  }, [todos]);

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
            {item.label}
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
      <button class="deleteButton" onClick={buttonClear}>Clear</button>
    </div>
  );
};

export default Home;
