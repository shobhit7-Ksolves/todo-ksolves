// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const apiUrl = process.env.REACT_APP_API_URL;

// function App() {
//   const [todos, setTodos] = useState([]);
//   const [text, setText] = useState('');

//   useEffect(() => {
//     fetchTodos();
//   }, []);

//   const fetchTodos = async () => {
//     const response = await axios.get(`${apiUrl}`/todos);
//     setTodos(response.data);
//   };

//   const addTodo = async () => {
//     await axios.post(`${apiUrl}`/todos, { text });
//     setText('');
//     fetchTodos();
//   };

//   const toggleTodo = async (id, completed) => {
//     await axios.put(`${apiUrl}/todos/${id}`, { completed: !completed });
//     fetchTodos();
//   };

//   const deleteTodo = async (id) => {
//     await axios.delete(`${apiUrl}/todos/${id}`);
//     fetchTodos();
//   };

//   return (
//     <div>
//       <h1>Todo List</h1>
//       <input
//         type="text"
//         value={text}
//         onChange={(e) => setText(e.target.value)}
//         placeholder="Enter todo..."
//       />
//       <button onClick={addTodo}>Add Todo</button>
//       <ul>
//         {todos.map(todo => (
//           <li key={todo._id}>
//             <span
//               style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
//               onClick={() => toggleTodo(todo._id, todo.completed)}
//             >
//               {todo.text}
//             </span>
//             <button onClick={() => deleteTodo(todo._id)}>Delete</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default App;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
// require('dotenv').config();




function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');



  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const response = await axios.get('http://192.168.49.2:30797/todos');
    setTodos(response.data);
  };

  const addTodo = async () => {
    await axios.post('http://192.168.49.2:30797/todos', { text });
    setText('');
    fetchTodos();
  };

  const toggleTodo = async (id, completed) => {
    await axios.put(`http://192.168.49.2:30797/todos/${id}`, { completed: !completed });
    fetchTodos();
  };

  const deleteTodo = async (id) => {
    await axios.delete(`http://192.168.49.2:30797/todos/${id}`);
    fetchTodos();
  };

  return (
    <div>
      <h1>TO-DO dont know what to do.....</h1>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter todo..."
      />
      <button onClick={addTodo}>Add Todo</button>
      <ul>
        {todos.map(todo => (
          <li key={todo._id}>
            <span
              style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
              onClick={() => toggleTodo(todo._id, todo.completed)}
            >
              {todo.text}
            </span>
            <button onClick={() => deleteTodo(todo._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
