import { useEffect, useState } from 'react'
import './App.css'
import Form from "./components/form";
import TodoList from './components/toDoList';

function App() {

  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState('all');
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false); // Track if todos were loaded

  // Load from localStorage on first render
  useEffect(() => {
    getLocalTodos();
  }, []);

  // Apply filters + save after todos change
  useEffect(() => {
    filterHandler();
    if (isLoaded) {
      saveLocalTodos(); // Save only if todos have been loaded
    }
  }, [todos, status]);

  const filterHandler = () => {
    switch (status) {
      case 'completed':
        setFilteredTodos(todos.filter(todo => todo.completed));
        break;
      case 'uncompleted':
        setFilteredTodos(todos.filter(todo => !todo.completed));
        break;
      default:
        setFilteredTodos(todos);
        break;
    }
  };

  const saveLocalTodos = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const getLocalTodos = () => {
    const local = localStorage.getItem("todos");
    if (local) {
      setTodos(JSON.parse(local));
    } else {
      localStorage.setItem("todos", JSON.stringify([]));
    }
    setIsLoaded(true); //  Mark as loaded
  };

  return (
    <div className="App">
      <header>
        <h1>Tushar's to-do list</h1>
      </header>
      <Form
        inputText={inputText}
        todos={todos}
        setTodos={setTodos}
        setInputText={setInputText}
        setStatus={setStatus}
      />
      <TodoList
        setTodos={setTodos}
        todos={todos}
        filteredTodos={filteredTodos}
      />
    </div>
  );
}

export default App;
