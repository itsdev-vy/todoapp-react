import { useState } from 'react'
import { Button, List, ListItem, ListItemText, Modal, makeStyles } from '@material-ui/core'
import classes from './Todo.module.css';
import db from './firebase'


const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px soild #000',
        // boxShadow: theme.shadow[5],
        padding: theme.spacing(2, 4, 3)

    }
}))


const Todo = (props) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [input, setInput] = useState();

    const handleOpen = () => {
        setOpen(true)
    }

    const updateTodo = () => {
        db.collection('todos').doc(props.value.id).set({
            todo: input
        }, { merge: true, })
        setOpen(false);
    }
    return (
        <>
            <Modal
                open={open}
                onClose={e => setOpen(false)}
            >
                <div className={classes.paper}>
                    <h1>I am a modal</h1>
                    <input placeholder={props.value.todo} value={input} onChange={(event) => setInput(event.target.value)} />
                    <Button onClick={updateTodo} color="primary">Update Todo</Button>
                </div>
            </Modal>

            <List className={classes.todo__list}>
                <ListItem>
                    <ListItemText primary={props.value.todo} secondary="Dummy Deadline⏰" />
                </ListItem>
                <button onClick={e => setOpen(true)}>Edit</button>
                <Button onClick={event => db.collection('todos').doc(props.value.id).delete()} color="secondary">Delete</Button>
            </List>
        </>
    )
}

export default Todo