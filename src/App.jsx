import TodoInput from "./components/TodoInput"
import TodoList from "./components/TodoList"
import { useState, useEffect } from 'react';

function App() {
  const [todos, setTodos] = useState([])
  const [todoValue, setTodoValue] = useState('')

  function persistData(newList){
    localStorage.setItem('todos', JSON.stringify({todos: newList}))
  }

  function handleAddTodos(newTodo){
    const newTodosList = [...todos, newTodo]
    persistData(newTodosList)
    setTodos(newTodosList)
  }

  function handleDeleteTodo(index){
    const newTodosList = todos.filter((todo,todoIndex)=>{ 
      return todoIndex != index
    })
    persistData(newTodosList)
    setTodos(newTodosList)
  }

  function handleEditTodo(index){
    const valueTobeEdited = todos[index]
    setTodoValue(valueTobeEdited)
    handleDeleteTodo(index)
  }

  useEffect(() => {
    if(!localStorage){
      return
    }
    let localTodos = localStorage.getItem('todos');
    if(!localTodos){
      return
    } 
    localTodos = JSON.parse(localTodos).todos
    setTodos(localTodos)
  },[])

  return (
    <>
      <TodoInput handleAddTodos={handleAddTodos} todoValue={todoValue} setTodoValue={setTodoValue}/>
      <TodoList todos={todos} handleDeleteTodo={handleDeleteTodo} handleEditTodo={handleEditTodo}/>
    </>
  )
}

export default App
