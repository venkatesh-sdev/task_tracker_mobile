/* esViewnt-disable react/prop-types */
import { Alert, Text, TouchableOpacity, View } from "react-native";


import { useDispatch, useSelector } from "react-redux";
import { categoriesTasks, deleteTask, getAllTasks } from "../../context/reducers/tasksReducer";

import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";

// Storage
import AsyncStorage from "@react-native-async-storage/async-storage";

const TaskCard = ({ task }) => {

    const { title, description, priority, assignee, status, id } = task;

    const tasks = useSelector(getAllTasks);

    // TH-Hooks
    const dispatch = useDispatch();
    const navigation = useNavigation();

    // Action Modal Handler
    const actionHandler = () =>
        Alert.alert('Perform Actions', 'Edit/Delete', [
            {
                text: 'Edit',
                onPress: editActionHandler,
            },
            {
                text: 'Cancel',
                onPress: () => { },
                style: 'cancel',
            },
            { text: 'Delete', onPress: deleteActionHandler },
        ]);

    // Task Edit Handlder
    const editActionHandler = () => {
        navigation.navigate('Editor', { isEditable: true, editableContent: task })
    }


    const reassignTasks = async () => {
        await AsyncStorage.removeItem('tasks');
        await AsyncStorage.setItem('tasks', JSON.stringify(tasks))
    }


    // Delete Tasks Handler
    const deleteActionHandler = () => {
        dispatch(deleteTask(id));
        reassignTasks();
        dispatch(categoriesTasks());
    }


    return <View className="bg-gray-200 rounded-lg p-2 ">
        <View className="flex-row justify-between items-center">
            <Text className="text-md font-medium">
                {title}
            </Text>
            <Text className="bg-button-1 rounded-sm text-white px-2 py-1 flex justify-center items-center text-sm">
                {priority}
            </Text>
        </View>
        <View className="h-[1.2px] w-full bg-black mt-3 mb-2" />
        <Text className="text-[13px] text-justify">
            {description}
        </Text>
        <View className="flex-row justify-between items-center my-2">
            <Text className="max-w-[150px] overflow-hidden text-ellipsis text-md">
                @{assignee}
            </Text>
            <View className="relative">
                <TouchableOpacity
                    onPress={actionHandler}
                    className="bg-button-1 rounded-sm text-white px-2 py-1 flex justify-center items-center text-sm z-0"
                >
                    <Ionicons name="ellipsis-vertical" size={24} color="white" />
                </TouchableOpacity>
            </View>
        </View>
        <TouchableOpacity className="bg-button-1 w-24 py-2 rounded-md  justify-center items-center">
            <Text className="font-medium text-md text-white">{status == 'Pending' ? 'Assign' : status}</Text>
        </TouchableOpacity>
    </View>
}

export default TaskCard