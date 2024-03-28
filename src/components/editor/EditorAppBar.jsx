import { AntDesign } from "@expo/vector-icons"
import { Text, TouchableOpacity, View } from "react-native"

const EditorAppBar = ({ isEditable, navigation }) => {
    return <View className="relative justify-center py-5 ">
        <TouchableOpacity
            className="z-10 absolute w-[50px] h-[50px] bg-white rounded-full justify-center items-center left-2"
            onPress={() => navigation.goBack()}
        >
            <AntDesign size={20} color={'black'} name='left' />
        </TouchableOpacity>
        <Text className="text-2xl font-medium text-center"
        >
            {isEditable ? "Update The Task" : "Add New Task"}
        </Text>
    </View>
}

export default EditorAppBar