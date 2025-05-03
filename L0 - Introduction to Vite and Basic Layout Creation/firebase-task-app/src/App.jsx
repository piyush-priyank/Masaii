import React, { useState, useEffect } from 'react';
import { firestore } from './firebase-config'; // Assumed correct config.

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Real-time listener using onSnapshot
    const unsubscribe = firestore.collection('tasks').onSnapshot((snapshot) => {
      const taskList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setTasks(taskList);
    });

    // Cleanup on unmount
    return () => unsubscribe();
  }, []); // Empty dependency array to run once

  return (
    <div>
      <h1>Tasks</h1>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>{task.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
