import { Text, TextInput, View } from 'react-native'
import React from 'react'

const EditorTextInput = ({
    value,
    title,
    setData,
    isMultiline,
    isEditable,
    placeholder
}) => {
    return <View className="px-5 gap-2 mb-3">
        <Text className="text-xl">
            {title}
        </Text>
        <TextInput
            value={value}
            placeholder={placeholder}
            editable={!isEditable}
            selectTextOnFocus={!isEditable}
            style={{ height: isMultiline ? 120 : null, maxHeight: isMultiline ? 120 : null }}
            numberOfLines={isMultiline ? 4 : null}
            multiline={isMultiline} onChangeText={(value) => setData(value)}
            className="bg-white p-2 text-lg rounded-lg justify-start items-start"
        />
    </View>
}


export default EditorTextInput
