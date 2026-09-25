'use client';

import React, { useState, useEffect } from 'react';

interface Task {
  id: number;
  text: string;
  category: 'UX' | 'Dev' | 'General';
  completed: boolean;
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, text: 'Definir arquetipo de usuario persona', category: 'UX', completed: true },
    { id: 2, text: 'Realizar pruebas de usabilidad del MVP', category: 'UX', completed: false },
    { id: 3, text: 'Desplegar aplicación en Webflow Cloud', category: 'Dev', completed: true },
    { id: 4, text: 'Revisar feedback visual y microinteracciones', category: 'UX', completed: false },
  ]);
  const [newTaskText, setNewTaskText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'UX' | 'Dev' | 'General'>('UX');
  const [filter, setFilter] = useState<'All' | 'UX' | 'Dev' | 'General'>('All');

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.completed).length;
  const progressPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskText.trim()) return;

    const newTask: Task = {
      id: Date.now(),
      text: newTaskText,
      category: selectedCategory,
      completed: false,
    };

    setTasks([...tasks, newTask]);
    setNewTaskText('');
  };

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'All') return true;
    return task.category === filter;
  });

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0f172a',
      color: '#f8fafc',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '2rem 1rem'
    }}>
      <div style={{ maxWidth: '650px', width: '100%' }}>
        {/* Header */}
        <header style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <span style={{
            fontSize: '0.85rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: '#38bdf8',
            fontWeight: '600',
            backgroundColor: 'rgba(56, 189, 248, 0.1)',
            padding: '0.25rem 0.75rem',
            borderRadius: '9999px'
          }}>
            MVP Fullstack • Experiencia de Usuario
          </span>
          <h1 style={{ fontSize: '2.25rem', fontWeight: '800', marginTop: '0.75rem', marginBottom: '0.5rem' }}>
            FlowTask UX
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '1rem' }}>
            Gestión de tareas con feedback visual directo y microinteracciones de usabilidad.
          </p>
        </header>

        {/* UX Card: Progress */}
        <div style={{
          backgroundColor: '#1e293b',
          borderRadius: '1rem',
          padding: '1.5rem',
          marginBottom: '1.5rem',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3)',
          border: '1px solid #334155'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <div>
              <h2 style={{ fontSize: '1.1rem', fontWeight: '600', margin: 0 }}>Progreso Diario</h2>
              <p style={{ fontSize: '0.85rem', color: '#94a3b8', margin: 0 }}>
                {completedTasks} de {totalTasks} tareas completadas
              </p>
            </div>
            <span style={{ fontSize: '1.5rem', fontWeight: '800', color: progressPercentage === 100 ? '#4ade80' : '#38bdf8' }}>
              {progressPercentage}%
            </span>
          </div>

          {/* Bar container */}
          <div style={{ width: '100%', height: '10px', backgroundColor: '#334155', borderRadius: '5px', overflow: 'hidden' }}>
            <div style={{
              width: `${progressPercentage}%`,
              height: '100%',
              backgroundColor: progressPercentage === 100 ? '#4ade80' : '#38bdf8',
              transition: 'width 0.4s ease-in-out, background-color 0.4s ease'
            }} />
          </div>
          
          <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.75rem', fontStyle: 'italic', textAlign: 'center' }}>
            {progressPercentage === 100 ? '🎉 ¡Felicidades! Completaste todas las tareas programadas.' : '💡 Tip UX: Mantené el enfoque completando una tarea a la vez.'}
          </p>
        </div>

        {/* Input Form */}
        <form onSubmit={handleAddTask} style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
          <input
            type="text"
            placeholder="Escribí una nueva tarea..."
            value={newTaskText}
            onChange={(e) => setNewTaskText(e.target.value)}
            style={{
              flex: '1',
              minWidth: '200px',
              padding: '0.75rem 1rem',
              borderRadius: '0.5rem',
              border: '1px solid #334155',
              backgroundColor: '#1e293b',
              color: '#fff',
              outline: 'none',
              fontSize: '0.95rem'
            }}
          />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value as any)}
            style={{
              padding: '0.75rem',
              borderRadius: '0.5rem',
              border: '1px solid #334155',
              backgroundColor: '#1e293b',
              color: '#cbd5e1',
              outline: 'none'
            }}
          >
            <option value="UX">UX</option>
            <option value="Dev">Dev</option>
            <option value="General">General</option>
          </select>
          <button
            type="submit"
            style={{
              backgroundColor: '#0284c7',
              color: '#fff',
              border: 'none',
              borderRadius: '0.5rem',
              padding: '0.75rem 1.25rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'background-color 0.2s'
            }}
          >
            + Agregar
          </button>
        </form>

        {/* Filters */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', alignItems: 'center' }}>
          <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Filtrar:</span>
          {(['All', 'UX', 'Dev', 'General'] as const).map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              style={{
                backgroundColor: filter === cat ? '#38bdf8' : '#1e293b',
                color: filter === cat ? '#0f172a' : '#cbd5e1',
                border: '1px solid #334155',
                borderRadius: '0.375rem',
                padding: '0.25rem 0.65rem',
                fontSize: '0.8rem',
                fontWeight: filter === cat ? '700' : '400',
                cursor: 'pointer'
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Task List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {filteredTasks.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#64748b', padding: '2rem 0' }}>No hay tareas registradas en esta categoría.</p>
          ) : (
            filteredTasks.map(task => (
              <div
                key={task.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  backgroundColor: task.completed ? 'rgba(30, 41, 59, 0.5)' : '#1e293b',
                  padding: '0.85rem 1rem',
                  borderRadius: '0.5rem',
                  border: '1px solid #334155',
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: 1 }}>
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(task.id)}
                    style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                  />
                  <span style={{
                    textDecoration: task.completed ? 'line-through' : 'none',
                    color: task.completed ? '#64748b' : '#f8fafc',
                    fontSize: '0.95rem'
                  }}>
                    {task.text}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{
                    fontSize: '0.7rem',
                    padding: '0.15rem 0.4rem',
                    borderRadius: '0.25rem',
                    backgroundColor: task.category === 'UX' ? 'rgba(168, 85, 247, 0.2)' : task.category === 'Dev' ? 'rgba(59, 130, 246, 0.2)' : 'rgba(107, 114, 128, 0.2)',
                    color: task.category === 'UX' ? '#c084fc' : task.category === 'Dev' ? '#60a5fa' : '#9ca3af',
                    fontWeight: '600'
                  }}>
                    {task.category}
                  </span>
                  <button
                    onClick={() => deleteTask(task.id)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#ef4444',
                      cursor: 'pointer',
                      fontSize: '1rem',
                      opacity: 0.7
                    }}
                    title="Eliminar tarea"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
