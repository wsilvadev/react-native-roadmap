import { TouchableOpacity, Text } from 'react-native'
import React from 'react'

type CustomButtonProps = {
    title: string
    handlePress: () => void
    containerStyles?: string
    textStyles?: string
    isLoading?: boolean
}

const CustomButton = ({
    title,
    handlePress,
    containerStyles,
    textStyles,
    isLoading,
}: CustomButtonProps) => {
    return (
        <TouchableOpacity
            onPress={handlePress}
            activeOpacity={0.7}
            className={` ${containerStyles} ${
                isLoading ? 'opacity-50' : ''
            } bg-secondary  min-h-[62px] justify-center items-center rounded-xl `}
            disabled={isLoading}
        >
            <Text
                className={`text-primary font-psemibold text-lg ${textStyles}`}
            >
                {title}
            </Text>
        </TouchableOpacity>
    )
}

export default CustomButton
