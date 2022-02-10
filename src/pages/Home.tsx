import React, { useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export interface HandleEditTaskProps {
  id: number;
  taskNewTitle: string;
}

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    //TODO - add new task

    const foundTask = tasks.find(task => task.title === newTaskTitle);

    if (foundTask) {
      Alert.alert('Task já cadastrada', 'Você não pode cadastrar uma task com o mesmo nome');
      return;
    }

    setTasks(prev => [...prev, {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false
    }])
  }

  function handleEditTask({id, taskNewTitle}: HandleEditTaskProps) {

    const updatedTasks = [...tasks];
    
    const foundIndex = updatedTasks.findIndex(task => task.id === id);

    updatedTasks[foundIndex].title = taskNewTitle;

    setTasks([...updatedTasks]);

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

    Alert.alert('Remover item', 'Tem certeza que você deseja remover esse item?', [
      {onPress: () => setTasks(prev => prev.filter(task => task.id !== id)), text: 'Sim'},
      {text: 'Não'}
    ])

    
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
        editTask={handleEditTask}
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