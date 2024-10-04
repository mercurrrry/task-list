import Searches from './components/Search/Searches.jsx';
import TaskList from './components/TaskList/TaskList.jsx'
import './App.css'
import AddBtn from './components/AddBtn/AddBttn.jsx'
import { useState } from 'react'
import AddForm from './components/AddForm/AddForrm.jsx'
import useSearchTasks from './components/hooks/useSearchTasks.js';
import { addTask, upDateTask, deleteTask } from './helpers/index.js';
import Notifications from './components/Notifications/Notifications.jsx';

function App() {
  const [tasks, setTasks] = useState([
    {id: 1, title: 'Task 1', description: 'Task 1 description', done: false},
    {id: 2, title: 'Task 2', description: 'Task 2 description', done: false},
    {id: 3, title: 'Task 3', description: 'Task 3 description', done: false},
    {id: 4, title: 'Task 4', description: 'Task 4 description', done: false}])
  
  const [searchGlobal, setSearchGlobal] = useState('')

  const searchTasks = useSearchTasks(tasks, searchGlobal)
  
  const onAddTask = addTask(tasks, setTasks)

  const onUpdateTask = upDateTask(tasks, setTasks)

  const onDeleteTask = deleteTask(tasks, setTasks)
  
  return (
    <> 
      <Notifications />
      <Searches setSearchGlobal={setSearchGlobal}/>
      <div className='main-wrapper'>
        <TaskList title="Активные" tasks={searchTasks} changeTask = {onUpdateTask} deleteTask = {onDeleteTask}/>
        <TaskList title="Завершенные" tasks={searchTasks} changeTask = {onUpdateTask} deleteTask = {onDeleteTask} sortBy='done'/>
      </div>
      <AddBtn>
      {
        (closeModal) => {
          return <AddForm closeModal={closeModal} addTask = {onAddTask}/>
        }
      }
      </AddBtn>
    </>
  )
}

export default App
