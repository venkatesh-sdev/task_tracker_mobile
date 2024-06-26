import { ScrollView, View } from 'react-native'
import React, { useEffect, useState } from 'react'

// Navigation
import { useNavigation } from '@react-navigation/native';

// Third Party Styling Lib
import { LinearGradient } from 'expo-linear-gradient';

// Constants
import { priorities } from '../constants/enums';
import { priorityList, statusList } from '../constants/data';

// StateManagement
import { addTask, editTask, getAllTasks } from '../context/reducers/tasksReducer';
import { useDispatch, useSelector } from 'react-redux';

// Components
import { CustomDropDown, CustomButton, EditorAppBar, EditorTextInput } from '../components';

//Storage 
import AsyncStorage from '@react-native-async-storage/async-storage';


const EditorScreen = ({ route }) => {

    const navigation = useNavigation()
    const dispatch = useDispatch();

    const isEditable = route.params?.isEditable || null;
    const editableContent = route.params?.editableContent || null;

    const [titleContent, setTitleContent] = useState('')
    const [descriptionContent, setDescriptionContent] = useState('')
    const [teamContent, setTeamContent] = useState('')
    const [assigneeContent, setAssigneeContent] = useState('')
    const [priorityContent, setPriorityContent] = useState(editableContent?.priority || priorities.p0);
    const [statusContent, setStatusContent] = useState(editableContent?.status || null);

    const tasks = useSelector(getAllTasks);

    const reassignTasks = async () => {
        await AsyncStorage.removeItem('tasks');
        await AsyncStorage.setItem('tasks', JSON.stringify(tasks))
    }

    const EditTask = () => {
        const actions = {
            id: editableContent.id,
            status: statusContent,
            priority: priorityContent,
        }
        dispatch(editTask(actions))
        navigation.goBack();
        reassignTasks();
    }
    const AddTask = async () => {
        const newTask = {
            title: titleContent,
            description: descriptionContent,
            assignee: assigneeContent,
            priority: priorityContent || priorities.p0,
            team: teamContent,
        }
        dispatch(addTask(newTask));
        navigation.goBack();
        reassignTasks();
    }

    useEffect(() => {
        if (isEditable && editableContent.title && editableContent.description && editableContent.team && editableContent.assignee) {
            setTitleContent(editableContent.title);
            setDescriptionContent(editableContent.description);
            setTeamContent(editableContent.team);
            setAssigneeContent(editableContent.assignee);
            setPriorityContent(editableContent.priority)
            setStatusContent(editableContent.status)
        }
    }, []);

    return (
        <LinearGradient
            colors={['#f4dbfa', '#d8dbfe']}
            end={{ x: 0.3, y: 0 }}
            locations={[0, 1]}
            className="flex-1 pb-5 pt-10"
        >
            <EditorAppBar
                isEditable={isEditable}
                navigation={navigation}
            />
            <ScrollView>
                <EditorTextInput
                    value={titleContent}
                    placeholder={'Title'}
                    isEditable={isEditable}
                    title={'Title:'}
                    setData={setTitleContent}
                />
                <EditorTextInput
                    value={descriptionContent}
                    placeholder={'Description'}
                    isEditable={isEditable}
                    title={'Description:'}
                    setData={setDescriptionContent}
                    isMultiline={true}
                />
                <EditorTextInput
                    value={teamContent}
                    placeholder={'Team'}
                    isEditable={isEditable}
                    title={'Team:'}
                    setData={setTeamContent}
                />
                <EditorTextInput
                    value={assigneeContent}
                    placeholder={'Assignee'}
                    isEditable={isEditable}
                    title={'Assignee:'}
                    setData={setAssigneeContent}
                />
                <View className="flex-row justify-between mt-3 px-5">
                    <CustomDropDown
                        data={priorityList}
                        title={'Priority'}
                        value={priorityContent}
                        setValue={setPriorityContent}
                        width={100}
                    />
                    {
                        isEditable && <CustomDropDown
                            data={statusList}
                            title={'Status'}
                            value={statusContent}
                            setValue={setStatusContent}
                            width={140}
                        />
                    }
                </View>
                <View className="mt-10">
                    <CustomButton
                        title={isEditable ? "Update Task" : "Add Task"}
                        onPress={isEditable ? EditTask : AddTask}
                    />
                </View>
            </ScrollView>
        </LinearGradient>
    )
}

export default EditorScreen








