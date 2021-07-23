import { useState, FormEvent } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const id  = Math.random();

  function handleCreateNewTask(event: FormEvent) {
    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.
    event.preventDefault();

    if (newTaskTitle == ''){
      console.log("preencha o campo")
    }
    else {
      const createTask = ({
        id,
        title: newTaskTitle,
        isComplete: false,
      });

      setTasks([
        ...tasks,
        createTask
      ]);

      setNewTaskTitle('');
    }
  }

  function handleToggleTaskCompletion(id: number) {
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID
    let updateChecked = [...tasks].map((task) => {
      if(task.id === id){
        task.isComplete = !task.isComplete;
      }
      return task;
    });
    setTasks(updateChecked);
  }

  function handleRemoveTask(id: number) {
    let deleteTask = [...tasks].filter((task) => task.id !== id)
    setTasks(deleteTask);
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header> 

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}               
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}