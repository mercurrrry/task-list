import { useEffect, useState } from 'react'
import classes from './Searches.module.css'
import { TextField } from '@mui/material'
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';


export default function Searches({setSearchGlobal}) {
    const [searchText, setSearchText] = useState('')
    const [isClear, setIsClear] = useState(false)
    
    const onClearClick = () => {
        setSearchText('')
        setIsClear(false)
    }
    
    useEffect(() => {
        setSearchGlobal(searchText)
    },[searchText])

    
    return (
        <div className={classes.search}>
            <TextField 
                label='Поиск'
                variant='outlined'
                fullWidth
                value={searchText}
                onInput={(e) => setSearchText(e.target.value)}
            />
            {
                <IconButton className={classes.clear} onClick={() => onClearClick()}>
                    {(searchText !== '')? <CloseIcon/>: <span/>}
                </IconButton>
            }
        </div>
    )
}