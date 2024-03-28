/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */

import { FlatList, Text, TouchableOpacity, View } from "react-native"

// React Imports
import {
    useEffect,
    useRef,
    useState
} from "react";
import {
    useSelector,
    useDispatch
} from "react-redux";

// Icons
import { AntDesign } from '@expo/vector-icons';


// State Management
import {
    categoriesTasks,
    getAllFilterTasks,
    getAllTasks,
    getCompletedTasks,
    getDefferdTasks,
    getDeployedTasks,
    getInProgressTasks,
    getIsFilterApplied,
    getPendingTasks,
    resetTasks,
} from "../../context/reducers/tasksReducer";

import TaskCategoryContainer from "./TaskCategoryContainer";
import { CustomButton, FilterBar } from "../index";
import { useNavigation } from "@react-navigation/native";


const Tasks = () => {

    //  Third Party Hook
    const dispatch = useDispatch();
    const navigation = useNavigation();

    // Local States
    const [filterPriorityContent, setFilterPriorityContent] = useState(null);
    const [filterAssigneeContent, setFilterAssigneeContent] = useState(null);
    const [filteredDate, setFilteredDate] = useState(null)

    // Global State Datas
    const tasks = useSelector(getAllTasks);
    const pendingTasks = useSelector(getPendingTasks);
    const completedTasks = useSelector(getCompletedTasks);
    const inProgressTasks = useSelector(getInProgressTasks);
    const deployedTasks = useSelector(getDeployedTasks);
    const defferedTasks = useSelector(getDefferdTasks);
    const isFilterApplied = useSelector(getIsFilterApplied);

    // To Triger a Add Filter Event
    const addFilter = () => {
        !isFilterApplied ?
            dispatch(
                getAllFilterTasks(
                    {
                        assigneeName: filterAssigneeContent,
                        priority: filterPriorityContent,
                        filteredDate: filteredDate,
                    }
                )
            ) :
            dispatch(resetTasks())
    }

    // useEffect for categories tasks
    useEffect(() => {
        dispatch(categoriesTasks());
    }, [tasks])

    const tasksList = [
        { title: "Pending", tasks: pendingTasks, color: 'bg-gray-500' },
        { title: "In Progress", tasks: inProgressTasks, color: 'bg-yellow-600' },
        { title: "Is Completed", tasks: completedTasks, color: 'bg-green-600' },
        { title: "Deployed", tasks: deployedTasks, color: 'bg-purple-900' },
        { title: "Deffered", tasks: defferedTasks, color: 'bg-red-400' },
    ]
    // Navigation Handler
    const navigateToEditorScreen = () => {
        navigation.navigate('Editor', { isEditable: false })
    }

    return (
        <View className="pt-2 px-2 rounded-lg flex-1">
            <FilterBar
                isFilterApplied={isFilterApplied}
                priorityContent={filterPriorityContent}
                setPriorityContent={setFilterPriorityContent}
                setFilterAssigneeContent={setFilterAssigneeContent}
                setFilteredDate={setFilteredDate}
                addFilter={addFilter}
            />
            <FlatList
                horizontal
                data={tasksList}
                keyExtractor={(_, index) => index.toString()}
                renderItem={({ item }) => <TaskCategoryContainer tasks={item.tasks} color={item.color} title={item.title} />}
                // pagingEnabled
                contentContainerStyle={{ marginTop: 10, gap: 20, }}
            />
            <CustomButton title={'Add New Task'} onPress={navigateToEditorScreen} />
        </View>
    )
}

export default Tasks



