import { useState, useRef, useEffect } from 'react';
import classes from './Task.module.css'
import Checkbox from '@mui/material/Checkbox';
import { TextField } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Fade from '@mui/material/Fade';

export default function Task( {task, changeTask, deleteTask}){
    const [isEdit, setIsEdit] = useState(false)
    const [isDone, setIsDone] = useState(task.done)
    const [taskTitle, setTaskTitle] = useState(task.title ?? '')
    const [taskDescription, setTaskDescription] = useState(task.description ?? '')
    const [isShowDialog, setIsShowDialog] = useState(false)

    const inputTitleRef = useRef(0)

    useEffect(() => {
        if (isEdit) inputTitleRef?.current?.focus()
    }, [isEdit])

    const onChangeDoneStatus = () => {
        setIsDone(!isDone)
        setTimeout(() => {
            changeTask(task.id, {done: !isDone})
        }, 50)
    }
    function modalAccept() {
        deleteTask(task.id)
        setIsShowDialog(false)
    }
    const acceptChanges = () => {
        if (taskTitle !== task.title || taskDescription !== task.description) {
            changeTask(task.id , {title: taskTitle, description: taskDescription})
        }
        setIsEdit(false)
    }

    const declineChanges = () => {
        setTaskTitle(task.title)
        setTaskDescription(task.description)
        setIsEdit(false)
    }

    return (
        <Fade in>
            <div className={`${classes.task} ${isDone ? classes['is-done']: ''}`}>
                <div className={classes['task-check']}>
                    <Checkbox
                        checked={isDone} 
                        onChange={() => onChangeDoneStatus()}
                        sx = {{color: isDone ? '#D8D8D8' : '#539CFD','&.Mui-checked': {color: isDone? '#D8D8D8' : '539CFD'}}}
                    />
                </div>

                <div className={classes['task-info']}>
                    {
                        isEdit
                            ? <>
                                <div className={classes['task-info__title-input', 'task-info-first-child']}>
                                    <TextField
                                        inputRef = {inputTitleRef}
                                        label="Название"
                                        defaultValue={taskTitle}
                                        onChange={(e) => setTaskTitle(e.target.value)}
                                    />
                                </div>
                                <div className={classes['task-info__description-input']}>
                                    <TextField
                                        sx={{ width: '25ch' }}
                                        label="Описание"
                                        defaultValue={taskDescription}
                                        onChange={(e) => setTaskDescription(e.target.value)}
                                    />
                                </div>
                            </>
                            : <>
                                <h2 className={classes['task-info__title']}>{ task.title }</h2>
                                <p className={classes['task-info__description']}>{ task.description }</p>
                            </>
                    }
                    
                </div>

                <div className={classes['task-actions']}>
                    {
                        isEdit ? <>
                            <Checkbox  onChange={() => acceptChanges()} icon={<CheckIcon sx = {{color: isDone ? '#D8D8D8' : '#539CFD'}}/>}  
                            />
                            <Checkbox onChange={() => declineChanges()}
                            icon={<CloseIcon sx = {{color: isDone ? '#D8D8D8' : '#539CFD'}}/>}/>
                        </>
                        : <Checkbox 
                            checked={isEdit} 
                            onChange={() => setIsEdit(!isEdit)}
                            icon={<EditIcon className={classes[isDone ? 'icon-is-done' : 'icon-is-not-done']}/>}
                        />
                    }
                    <Checkbox 
                        icon={<DeleteForeverIcon sx = {{color: isDone ? '#D8D8D8' : '#539CFD'}}/>} onClick = {() => setIsShowDialog(true)} checked = {false}
                    />
                    <Dialog open={isShowDialog} onClose={() => setIsShowDialog(false)} maxWidth ='md' aria-labelledby='alert-dialog-title'>
                        <DialogTitle>{'Удалить задачу'}</DialogTitle>
                        <DialogActions>
                            <Button onClick={() => modalAccept()}>Удалить</Button>
                            <Button onClick={() => setIsShowDialog(false)}>Отменить</Button>
                    </DialogActions>
                    </Dialog>
                </div>
                
            </div>
        </Fade>
    )
}

