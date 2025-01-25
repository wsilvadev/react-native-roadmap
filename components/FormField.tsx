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
    title: string
    value: string
    placeholder?: string
    handleChangeText: (text: string) => void
    otherStyles?: string
    keyboardType?: KeyboardTypeOptions
}

const FormField = ({
    title,
    value,
    placeholder,
    handleChangeText,
    otherStyles,
    keyboardType,
    ...props
}: FormFieldProps) => {
    const [showPassword, setShowPassword] = useState(false)
    const [isFocused, setIsFocused] = useState(false)

    return (
        <View className={`space-y-2 ${otherStyles}`}>
            <Text className="text-base text-gray-100 font-pmedium">
                {title}
            </Text>
            <View
                className={`border-2 w-full h-16 px-4 bg-black-100 rounded-2xl items-center  ${
                    isFocused ? 'border-secondary' : 'border-black-200'
                } flex-row`}
            >
                <TextInput
                    className="flex-1 text-white font-psemibold text-base"
                    value={value}
                    placeholder={placeholder}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    placeholderTextColor="#7b7b8b"
                    onChangeText={handleChangeText}
                    secureTextEntry={title === 'Password' && !showPassword}
                    keyboardType={keyboardType}
                    autoCapitalize="none"
                />
                {title === 'Password' && (
                    <TouchableOpacity
                        onPress={() => setShowPassword(!showPassword)}
                    >
                        <Image
                            source={!showPassword ? icons.eye : icons.eyeHide}
                            className="w-6 h-6"
                            resizeMode="contain"
                        />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    )
}

export default FormField
