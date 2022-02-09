import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    //TODO - add new task
    setTasks(prev => [...prev, {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false
    }])
  }

  function handleToggleTaskDone(id: number) {
    //TODO - toggle task done if exists
   const updatedTasks = [...tasks];

   const foundTaskIndex = updatedTasks.findIndex(task => task.id === id);

   updatedTasks[foundTaskIndex].done = !updatedTasks[foundTaskIndex].done;

   setTasks(updatedTasks);

  }

  function handleRemoveTask(id: number) {
    //TODO - remove task from state
    setTasks(prev => prev.filter(task => task.id !== id));
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})