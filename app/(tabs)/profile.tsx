import { Text, View, Button } from 'react-native'
import React from 'react'
import { signOut } from '@/lib/appwrite'
import { router } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'

const logOut = async () => {
    await signOut()
    router.push('/sign-in')
}
const Profile = () => {
    return (
        <SafeAreaView>
            <Text>Profile</Text>
            <Button
                title="Logout"
                onPress={logOut}
                color="#ff0000"
                accessibilityLabel="Tap to logout"
            />
        </SafeAreaView>
    )
}

export default Profile
