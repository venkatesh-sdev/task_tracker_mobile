/* esViewnt-disable react/prop-types */
import { useState } from "react";

import { useDispatch } from "react-redux";
import { categoriesTasks, deleteTask } from "../../context/reducers/tasksReducer";
import { Alert, Text, TouchableOpacity, View } from "react-native";

import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";

const TaskCard = ({ task }) => {


    const { title, description, priority, assignee, status, id } = task;

    const dispatch = useDispatch();
    const navigation = useNavigation();

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

    const editActionHandler = () => {
        navigation.navigate('Editor', { isEditable: true, editableContent: task })
    }

    const deleteActionHandler = () => {
        dispatch(deleteTask(id));
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