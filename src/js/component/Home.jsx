import React, { useState, useEffect } from 'react';

const Home = () => {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState([]);

  function handleTask(event) {
    setInputValue(event.target.value);
  }

  async function handleTaskList(event) {
    if (event.key === "Enter") {
      if (inputValue.trim() !== "") {
        const newTask = { label: inputValue, done: false };
        const updatedTodos = [...todos, newTask];
        setTodos(updatedTodos);
        setInputValue("");

        try {
          // Enviar la nueva tarea a la API usando POST
          await updateTodoList(updatedTodos);
        } catch (error) {
          console.error('Error:', error);
        }
      }
    }
  }

  async function handleDeleteTask(index) {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);

    try {
      // Enviar la lista actualizada a la API usando PUT
      await updateTodoList(updatedTodos);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  async function updateTodoList(updatedTodos) {
    try {
      const response = await fetch(
        "https://playground.4geeks.com/apis/fake/todos/user/biancadmsa",
        {
          method: 'PUT',
          body: JSON.stringify(updatedTodos),
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      if (!response.ok) {
        throw new Error('Error al actualizar la lista en la API');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  async function buttonClear() {
    setTodos([]);

    try {
      // Enviar la lista vacía a la API usando POST
      await updateTodoList([]);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  useEffect(() => {
    async function fetchTodoList() {
      try {
        const response = await fetch(
          "https://playground.4geeks.com/apis/fake/todos/user/biancadmsa"
        );
        const data = await response.json();
        console.log("Todo list:", data);
        setTodos(data);
      } catch (error) {
        console.error("Error:", error);
      }
    }

    fetchTodoList();
  }, []);
  

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
                onClick={() => handleDeleteTask(index)} // Llama a la función para eliminar la tarea
              ></i>
            </span>
          </li>
        ))}
      </ul>
      <div>{todos.length} Item</div>
      <button className="deleteButton" onClick={buttonClear}>Clear</button>
    </div>
  );
};

export default Home;
