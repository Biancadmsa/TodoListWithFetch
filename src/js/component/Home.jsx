import React, { useState } from 'react';




// [ ]
const Home = () => {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos]=useState([]);
  return (
  <div className ="container"> 
  
  <h1>My Todos</h1>
  
      <ul>
        <li>
          <input type="text"  maxlength="38"
          onChange={(e)=> setInputValue(e.target.value)} 
          value={inputValue} 
          onKeyDown= {(e) => {
          
            if (e.key === "Enter"){
              if(todos.length < 10){
                if(inputValue.trim() !== ""){
              setTodos(todos.concat(inputValue));
              setInputValue("");
                } else alert("ingresa un texto")
            }
         }}}
          
          placeholder="What needs to be done?"></input>
        </li>
        {todos.map((item, index)=>(
        <li>
          {item}{""}<i class="fa-solid fa-xmark" 
          onClick={()=>
          setTodos(
            todos.filter(
            (t, currentIndex)=> 
            index != currentIndex
            )
          )
        }></i>
        </li>
      ))}
      </ul>
  <div>{todos.length} Item</div>
  </div>
  )}
  export default Home;
