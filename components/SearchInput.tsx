import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    KeyboardTypeOptions,
} from 'react-native'
import React, { useState } from 'react'

import { icons } from '@/constants'

type FormFieldProps = {
    title?: string
    value?: string
    placeholder?: string
    handleChangeText?: (text: string) => void
    otherStyles?: string
    keyboardType?: KeyboardTypeOptions
}

const SearchInput = ({
    title,
    value,
    placeholder,
    handleChangeText,
    otherStyles,
    keyboardType,
}: FormFieldProps) => {
    const [showPassword, setShowPassword] = useState(false)
    const [isFocused, setIsFocused] = useState(false)

    return (
        <View
            className={`border-2 w-full h-16 px-4 bg-black-100 rounded-2xl items-center space-x-4  ${
                isFocused ? 'border-secondary' : 'border-black-200'
            } flex-row `}
        >
            <TextInput
                className="text-base mt-0.5 text-white flex-1 font-pregular"
                value={value}
                placeholder="Search for a video topic"
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholderTextColor="#7b7b8b"
                onChangeText={handleChangeText}
                secureTextEntry={title === 'Password' && !showPassword}
                keyboardType={keyboardType}
            />
            <TouchableOpacity>
                <Image
                    source={icons.search}
                    className="w-5 h-5"
                    resizeMode="contain"
                />
            </TouchableOpacity>
        </View>
    )
}

export default SearchInput
