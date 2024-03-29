import { useState } from "react";

// Third Party Components
import { Dropdown } from "react-native-element-dropdown";

const CustomDropDown = ({ data, title, value, setValue, className, width }) => {
    const [isFocus, setIsFocus] = useState(false);
    return <Dropdown
        data={data}
        dropdownPosition='auto'
        maxHeight={300}
        className={`bg-white w-[100px] rounded-lg px-2 ${className}`}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? title : '...'}
        value={value}
        style={{ width: width }}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
            setValue(item.value);
            setIsFocus(false);
        }}
    />
}

export default CustomDropDown