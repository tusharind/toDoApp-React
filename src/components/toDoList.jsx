import React from "react";
import Todo from "./todo";
const TodoList = ({ setTodos,todos, filteredTodos }) => {

    return (
        <div className="todo-container">
            <ul className="todo-list">
                {filteredTodos.map(todo => (
                    <Todo setTodos={setTodos} todo={todo} text={todo.text} key={todo.id} todos={todos}/>
                ))}
               
            </ul>
        </div>
    );
}

export default TodoList;


  