'use client';

import { useEffect, useState } from 'react';

const STORAGE_KEY = 'agentic_todos';

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      if (Array.isArray(saved)) setTodos(saved);
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  function addTodo(e) {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;
    setTodos([{ id: Date.now(), text: trimmed, done: false }, ...todos]);
    setText('');
  }

  function toggleTodo(id) {
    setTodos(todos.map(t => t.id === id ? { ...t, done: !t.done } : t));
  }

  function removeTodo(id) {
    setTodos(todos.filter(t => t.id !== id));
  }

  return (
    <div className="card">
      <form onSubmit={addTodo} className="row gap">
        <input
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Add a task..."
          className="input"
          aria-label="New task"
        />
        <button className="button" type="submit">Add</button>
      </form>

      <ul className="list">
        {todos.length === 0 && <li className="muted">No tasks yet. Add one above.</li>}
        {todos.map(todo => (
          <li key={todo.id} className="list-item">
            <label className="row gap">
              <input
                type="checkbox"
                checked={todo.done}
                onChange={() => toggleTodo(todo.id)}
              />
              <span className={todo.done ? 'done' : ''}>{todo.text}</span>
            </label>
            <button className="icon-button" onClick={() => removeTodo(todo.id)} aria-label="Delete">?</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
