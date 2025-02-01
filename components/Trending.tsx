import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    ImageBackground,
    Image,
    Dimensions,
} from 'react-native'
import React, { useState } from 'react'
import * as Animatable from 'react-native-animatable'
import { CustomAnimation } from 'react-native-animatable'
import { icons } from '@/constants'
import { useVideoPlayer, VideoView } from 'expo-video'
import { useEvent } from 'expo'

type ExtendedCustomAnimation = CustomAnimation & {
    [key: number]: { scale: number }
}

const zoomIn: ExtendedCustomAnimation = {
    0: { scale: 0.9 },
    1: { scale: 1 },
}

const zoomOut: ExtendedCustomAnimation = {
    0: { scale: 1 },
    1: { scale: 0.9 },
}

const TrendingItem = ({ activeItem, item }: any) => {
    const [play, setPlay] = useState(false)
    const videoSource = item.video
    const players = useVideoPlayer(videoSource, (player) => {
        player.loop = true
        player.staysActiveInBackground = true
    })

    const { isPlaying } = useEvent(players, 'playingChange', {
        isPlaying: players.playing,
    })

    return (
        <Animatable.View
            className="mr-5"
            animation={activeItem === item.$id ? zoomIn : zoomOut}
            duration={1000}
        >
            {play ? (
                <View className="w-52 h-72 rounded-[35px] mt-3 bg-white/10">
                    <VideoView
                        player={players}
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
                    className="relative justify-center items-center"
                    activeOpacity={0.7}
                    onPress={() => {
                        if (isPlaying) {
                            players.pause()
                            setPlay(false)
                        } else {
                            players.play()
                            setPlay(true)
                        }
                    }}
                >
                    <ImageBackground
                        source={{
                            uri: item.thumbnail,
                        }}
                        className="w-52 h-72 rounded-[35px] my-5 overflow-hidden shadow-lg shadow-black/40"
                        resizeMode="cover"
                    />
                    <Image
                        source={icons.play}
                        className="absolute w-12 h-12"
                        resizeMode="contain"
                    />
                </TouchableOpacity>
            )}
        </Animatable.View>
    )
}

const Trending = ({ posts }: any) => {
    const [activeItem, setActiveItem] = useState(posts[0]?.$id)
    const viewableItemsChanges = ({ viewableItems }: any) => {
        if (viewableItems.length > 0) {
            setActiveItem(viewableItems[0]?.item?.$id)
        }
    }
    return (
        <FlatList
            data={posts}
            keyExtractor={(item) => item.$id}
            renderItem={({ item }) => (
                <TrendingItem activeItem={activeItem} item={item} />
            )}
            onViewableItemsChanged={viewableItemsChanges}
            viewabilityConfig={{
                itemVisiblePercentThreshold: 70,
            }}
            horizontal
        />
    )
}

export default Trending
