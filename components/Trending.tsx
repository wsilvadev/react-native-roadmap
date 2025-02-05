import {
    View,
    FlatList,
    TouchableOpacity,
    ImageBackground,
    Image,
} from 'react-native'
import React, { useState, useEffect } from 'react'
import * as Animatable from 'react-native-animatable'
import { CustomAnimation } from 'react-native-animatable'
import { icons } from '@/constants'
import { useVideoPlayer, VideoView, VideoPlayer } from 'expo-video'
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
interface props {
    activeItem?: string
    item?: any
    posts?: any
    activePlayer: any
    setActivePlayer: any
}

const TrendingItem = ({
    activeItem,
    item,
    activePlayer,
    setActivePlayer,
}: props) => {
    const [play, setPlay] = useState(false)
    const videoSource = item.video
    const players = useVideoPlayer(videoSource, (player) => {
        player.loop = true
    })

    const { isPlaying } = useEvent(players, 'playingChange', {
        isPlaying: players.playing,
    })
    useEffect(() => {
        if (activePlayer && activePlayer !== players) {
            players.pause()
            setPlay(false)
        }
    }, [activePlayer, players])
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
                            setActivePlayer(players)
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
    const [activePlayer, setActivePlayer] = useState(null)

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
                <TrendingItem
                    activePlayer={activePlayer}
                    setActivePlayer={setActivePlayer}
                    activeItem={activeItem}
                    item={item}
                />
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
