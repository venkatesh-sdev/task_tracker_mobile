import { Text, View } from 'react-native'
import React from 'react'

// Third Party Styling Libs
import { LinearGradient } from 'expo-linear-gradient'

// Components
import Tasks from '../components/home/Tasks'


const HomeScreen = () => {
    return (
        <LinearGradient colors={['#f4dbfa', '#d8dbfe']} end={{ x: 0.3, y: 0 }} locations={[0, 1]} className="flex-1 pb-5">
            <View className="flex flex-row items-center justify-between px-5 pb-2 flex-3 pt-10">
                {/* Logo */}
                <Text className="text-2xl font-bold ">Task Board</Text>
                {/* Profile */}
                <View className="flex justify-center items-center bg-red-300 w-[50px] h-[50px] rounded-full">
                    <Text className="md:text-2xl text-lg font-bold">V</Text>
                </View>
            </View>
            <Tasks />
        </LinearGradient>
    )
}

export default HomeScreen