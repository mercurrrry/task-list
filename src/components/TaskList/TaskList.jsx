import { useEffect, useState } from "react"
import Task from "../Task/Task"
import classes from "./TaskLiast.module.css"

export default function TaskList({ tasks, title, changeTask, sortBy, deleteTask}){

    const [sortTasks, setSortTasks] = useState([])

    useEffect(() => {
        setSortTasks(
            [...tasks].filter(task => sortBy ? task[sortBy] : !task.done)
        )
    }, [tasks, sortBy])
    return(
        <div className={classes.wrapper}>
            <div className={classes['list-title']}>{title}</div>
            <div className={classes['task-list']}>
                {
                    sortTasks.length ? sortTasks.map((task) => {
                        return <Task task={task} key={`${task.title}-${task.done}-${task.id}`} changeTask = {changeTask} deleteTask ={deleteTask}/>
                    })
                    : <div className={classes.wrap}>Список задач пуст</div>
                }
            </div>
        </div>
    )
}