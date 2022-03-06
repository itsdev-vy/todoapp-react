import { useState, useEffect } from 'react';
import firebase from 'firebase';
import db from './firebase';
import { Button, FormControl, Input, InputLabel } from '@material-ui/core';
import './App.css';
import Todo from './Todo';


function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    db.collection('todos').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      setTodos(snapshot.docs.map((doc) => ({ id: doc.id, todo: doc.data().todo })))
    })
  }, [])


  const addTodo = (event) => {
    event.preventDefault();

    db.collection('todos').add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    setInput('');
  }

  return (
    <div className="App">
      <h1>Todo App 🚀</h1>
      <form >
        <FormControl>
          <InputLabel>✅ Write a Todo</InputLabel>
          <Input type="text" value={input} onChange={event => setInput(event.target.value)} />
        </FormControl>

        <Button disabled={!input} onClick={addTodo} variant="contained" color="primary">Add Todo</Button>
      </form>

      <ul>
        {todos.map((todo) => <Todo value={todo} />)}
      </ul>
    </div>
  );
}

export default App;
