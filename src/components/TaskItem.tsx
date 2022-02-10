import React, {useState, useRef, useEffect} from 'react';
import { Image, TouchableOpacity, View, Text, StyleSheet, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';


import trashIcon from '../assets/icons/trash/trash.png';
import editIcon from '../assets/icons/pen.png';
import { HandleEditTaskProps } from '../pages/Home';
import { Task } from './TasksList';


interface TaskListProps {
    item: Task;
    toggleTaskDone: (id: number) => void;
    removeTask: (id: number) => void;
    editTask: (value: HandleEditTaskProps) => void;
    index: number;
}

export const TaskItem: React.FC<TaskListProps> = ({item, toggleTaskDone, removeTask, editTask, index}) => {

  const [isEditing, setIsEditing] = useState(false);  
  const [editedValue, setEditedValue] = useState(item.title);

  const textInputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (isEditing) {
        textInputRef?.current?.focus();
    } else {
        textInputRef?.current?.blur();
    }
  }, [isEditing]);

  const handleStarEditing = () => {
      setIsEditing(true);
  }

  const handleCancelEditing = () => {
      setEditedValue(item.title);
      setIsEditing(false);
  }

  const handleSubmitEditing = () => {
      editTask({id: item.id, taskNewTitle: editedValue});
      setIsEditing(false);

  }

  return (
      <>
            <View>
              <TouchableOpacity
                testID={`button-${index}`}
                activeOpacity={0.7}
                style={styles.taskButton}
                //TODO - use onPress (toggle task) prop
                onPress={() => toggleTaskDone(item.id)}
              >
                <View 
                  testID={`marker-${index}`}
                  //TODO - use style prop 
                  style={item.done ? styles.taskMarkerDone : styles.taskMarker}
                >
                  { item.done && (
                    <Icon 
                      name="check"
                      size={12}
                      color="#FFF"
                    />
                  )}
                </View>

                <TextInput 
                    value={editedValue}
                    onChangeText={text => setEditedValue(text)}
                    editable={isEditing}
                    onSubmitEditing={handleSubmitEditing}
                    style={item.done ? styles.taskTextDone : styles.taskText}
                    ref={textInputRef}
                />

                {/* <Text 
                  //TODO - use style prop
                  style={item.done ? styles.taskTextDone : styles.taskText}
                >
                  {item.title}
                </Text> */}
              </TouchableOpacity>
            </View>
          <View style={{flexDirection: 'row'}}>
           {isEditing ? (
                <TouchableOpacity
                style={{ paddingHorizontal: 24 }}
                //TODO - use onPress (remove task) prop
                onPress={handleCancelEditing}
              >
              <Icon name="x" size={24} color="#b2b2b2" />
            </TouchableOpacity>
           )  : (
             <>
            <TouchableOpacity
              onPress={handleStarEditing}
            >
              <Image source={editIcon} />
            </TouchableOpacity>
            <TouchableOpacity
              testID={`trash-${index}`}
              //TODO - use onPress (remove task) prop
              onPress={() => removeTask(item.id)}
              style={{marginLeft: 24, marginRight: 10}}
            >
              <Image source={trashIcon} style={{ opacity: isEditing ? 0.2 : 1 }} />
            </TouchableOpacity>
          </>
           )}
          </View>
      </>
  )
}

const styles = StyleSheet.create({
    taskButton: {
      flex: 1,
      paddingHorizontal: 24,
      paddingVertical: 15,
      marginBottom: 4,
      borderRadius: 4,
      flexDirection: 'row',
      alignItems: 'center'
    },
    taskMarker: {
      height: 16,
      width: 16,
      borderRadius: 4,
      borderWidth: 1,
      borderColor: '#B2B2B2',
      marginRight: 15,
      alignItems: 'center',
      justifyContent: 'center'
    },
    taskText: {
      color: '#666',
      fontFamily: 'Inter-Medium'
    },
    taskMarkerDone: {
      height: 16,
      width: 16,
      borderRadius: 4,
      backgroundColor: '#1DB863',
      marginRight: 15,
      alignItems: 'center',
      justifyContent: 'center'
    },
    taskTextDone: {
      color: '#1DB863',
      textDecorationLine: 'line-through',
      fontFamily: 'Inter-Medium'
    }
  })
