import { AntDesign } from "@expo/vector-icons"
import { Text, TextInput, TouchableOpacity, View } from "react-native"
import CustomDropDown from "../global/CustomDropDown";
import { priorityList } from "../../constants/data";
import { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";

const FilterBar = ({
    isFilterApplied,
    priorityContent,
    setPriorityContent,
    setFilterAssigneeContent,
    setFilteredDate,
    addFilter
}) => {

    const [date, setDate] = useState(new Date());
    const [showDateModal, setShowDateModal] = useState(false);

    const dateChange = (event, date) => {
        const newDate = parseInt(
            date.getFullYear() + "" +
            (date.getMonth() + 1) + "" +
            date.getDate()
        );
        setDate(date);
        setFilteredDate(newDate);
        setShowDateModal(false);
    }

    return <View className="flex-2 gap-y-2 justify-start px-2 ">
        <View className="flex-row justify-between">
            <Text className="font-medium text-lg text-black">
                Filter By:
            </Text>
            <TouchableOpacity onPress={addFilter}>
                <Text className="font-medium text-sm text-blue-600">
                    {isFilterApplied ? "Remove" : "Apply"}
                </Text>
            </TouchableOpacity>
        </View>
        <View className="flex flex-row gap-x-2">
            <View className="flex-1 bg-white rounded-md mr-2 items-center flex-row px-2">
                <TextInput
                    placeholder="Assignee"
                    onChangeText={(value) => setFilterAssigneeContent(value)}
                />
            </View>
            <CustomDropDown
                data={priorityList}
                title={'Priority'}
                value={priorityContent}
                setValue={setPriorityContent}
                width={100}
            />
            <TouchableOpacity
                onPress={() => setShowDateModal(true)}
                className="flex-1 bg-white flex-row items-center justify-center rounded-md px-4"
            >
                <Text className="text-[16px] text-gray-500 p-2 text-center rounded-md">
                    {date ? date.toLocaleDateString() : "DD/MM/YY"}
                </Text>
                <AntDesign
                    name="calendar"
                    size={24}
                    color="#999"
                />
            </TouchableOpacity>
            {
                showDateModal && <DateTimePicker
                    value={date}
                    mode='date'
                    display='calendar'
                    onChange={dateChange}
                    testID="datePicker"
                />
            }
        </View>
    </View>
}

export default FilterBar;