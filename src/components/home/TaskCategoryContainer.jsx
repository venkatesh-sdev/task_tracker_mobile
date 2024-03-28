/* eslint-disable react/prop-types */
import { Dimensions, FlatList, Text, View } from "react-native"
import TaskCard from "./TaskCard"



const TaskCategoryContainer = ({ title, color, tasks }) => {

    return <View className={`rounded-lg bg-white `} style={{
        width: Dimensions.get('window').width - (16)
    }}>
        {/* Category Title */}
        <Text className={`${color} w-full rounded-t-lg b p-2 text-white font-medium text-lg text-center`}>
            {title}
        </Text>
        {/* Category List */}
        <View className="px-2 pb-2">
            {
                tasks.length === 0 ?
                    <Text className="text-center mt-20  items-center justify-center text-lg"> No Tasks Yet</Text>
                    : <FlatList
                        showsHorizontalScrollIndicator
                        showsVerticalScrollIndicator
                        data={tasks}
                        keyExtractor={(_, index) => index.toString()}
                        renderItem={({ item }) => <TaskCard task={item} />}
                        contentContainerStyle={{
                            paddingBottom: tasks.length * 10,
                            rowGap: 10,
                            paddingTop: 10,
                        }}
                    />
            }
        </View>
    </View>
}


export default TaskCategoryContainer