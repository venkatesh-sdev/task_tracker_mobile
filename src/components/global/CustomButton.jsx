import { Text, TouchableOpacity, View } from "react-native"

const CustomButton = ({ onPress, title }) => {

    return <View className="h-16  justify-center items-center">
        <TouchableOpacity onPress={onPress} className="bg-button-1  px-16 py-2 rounded-lg">
            <Text className="text-xl font-medium text-white">
                {title}
            </Text>
        </TouchableOpacity>
    </View>
}
export default CustomButton