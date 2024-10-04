import { TextField } from "@mui/material"
import Button from '@mui/material/Button';
import classes from "./AddForm.module.css"
import { useState, useEffect} from "react"

export default function AddForm({addTask, closeModal}){
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [isTitleValid, setIsTitleValid] = useState(description && description.trim())
    const [isDescriptionValid, setIsDescriptionalid] = useState(description && description.trim())

    useEffect(() => {
        setIsTitleValid(title && title.trim())
        setIsDescriptionalid(description && description.trim())
        

    }, [title, description])

    const addNewTask = (e) => {
        e.preventDefault()

        if (!isTitleValid || !isDescriptionValid) return 
        addTask({title, description})
        closeModal()
    }
    return (
        <>
            <form action="" className={classes['add-task-form']}
            onSubmit={(e) => addNewTask(e)}>
                <h2>Новая задача</h2>
                <div className={classes['form-title']}>
                    <TextField error={!isTitleValid} 
                        id="outlined-basic" label="Название" 
                        helperText = {!isTitleValid? "Поле обязательно для заполнения": ""}
                        value={title} 
                        variant="outlined" 
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className={classes['form-description']}>
                    <TextField error={!isDescriptionValid} 
                        id="outlined-basic" label="Описание" 
                        helperText = {!isDescriptionValid? "Поле обязательно для заполнения": ""}
                        value={description} 
                        variant="outlined" 
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <Button type="submit" variant = "outlined">Добавить</Button>
            </form>
        </>
    )
}