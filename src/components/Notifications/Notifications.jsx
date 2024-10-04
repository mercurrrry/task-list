import classes from './Notifications.module.css'
import SnackbarContent from '@mui/material/SnackbarContent';


export default function Notifications(){
    return (
        <div className={classes['noti-wrapper']}>
            <SnackbarContent message="Список дел" sx={{minHeight: '50px', backgroundColor: 'black', textAlign:'center', justifyContent:'center', fontSize:'35px'} 
            }/>
        </div>
    )
}