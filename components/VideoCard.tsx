import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { icons } from '@/constants'
import { useVideoPlayer, VideoView } from 'expo-video'
import { useEvent } from 'expo'

interface Props {
    video: {
        title: string
        thumbnail: string
        video: string
        creator: { username: string; avatar: string }
    }
}

const VideoCard = ({
    video: {
        title,
        thumbnail,
        video,
        creator: { username, avatar },
    },
}: Props) => {
    const [play, setPlay] = useState(false)
    const player = useVideoPlayer(video, (player) => {
        player.loop = true
        player.staysActiveInBackground = true
    })
    const { isPlaying } = useEvent(player, 'playingChange', {
        isPlaying: player.playing,
    })

    return (
        <View className="flex-col items-center px-4 mb-14">
            <View className="flex-row gap-3 items-start">
                <View className="justify-center items-center flex-row flex-1">
                    <View className="w-[46px] h-[46px] rounded-lg border border-secondary justify-center items-center p-0.5">
                        <Image
                            source={{ uri: avatar }}
                            className="w-full h-full rounded-lg"
                            resizeMode="cover"
                        />
                    </View>
                    <View className="justify-center flex-1 ml-3 gap-y-1">
                        <Text className="text-white font-psemibold text-sm">
                            {title}
                        </Text>
                        <Text className="text-xs font-pregular text-gray-100">
                            {username}
                        </Text>
                    </View>
                </View>
                <View className="pt-2">
                    <Image
                        source={icons.menu}
                        className="w-5 h-5"
                        resizeMode="contain"
                    />
                </View>
            </View>
            {play ? (
                <View className="w-full h-60 rounded-[35px] mt-3 bg-white/10">
                    <VideoView
                        player={player}
                        style={{
                            width: '100%',
                            height: '100%',
                        }}
                        allowsFullscreen
                        allowsPictureInPicture
                        startsPictureInPictureAutomatically
                    />
                </View>
            ) : (
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => {
                        if (isPlaying) {
                            player.pause()
                            setPlay(false)
                        } else {
                            player.play()
                            setPlay(true)
                        }
                    }}
                    className="w-full h-60 rounded-xl m-3 relative justify-center items-center"
                >
                    <Image
                        source={{ uri: thumbnail }}
                        className="w-full h-full rounded-xl mt-3"
                        resizeMode="cover"
                    />
                    <Image
                        source={icons.play}
                        className="w-12 h-12 absolute"
                        resizeMode="contain"
                    />
                </TouchableOpacity>
            )}
        </View>
    )
}

export default VideoCard
