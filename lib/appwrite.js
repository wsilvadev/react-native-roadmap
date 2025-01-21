import {
    Account,
    Avatars,
    Databases,
    Client,
    ID,
    Query,
} from 'react-native-appwrite'

export const config = {
    endpoint: 'https://cloud.appwrite.io/v1',
    projectID: '678c3e8e000dde9d43ae',
    platform: 'com.roadmap_course',
    databaseId: '678c4048001845d71939',
    userCollectionId: '678c409f00177a663518',
    videoCollectionId: '678c40ce000d4adfb583',
    storageId: '678c428e003837434d4c',
}

// Init your React Native SDK
const client = new Client()

client
    .setEndpoint(config.endpoint) // Your Appwrite Endpoint
    .setProject(config.projectID) // Your project ID
    .setPlatform(config.platform) // Your application ID or bundle ID.

const account = new Account(client)
const avatars = new Avatars(client)
const databases = new Databases(client)
export const createUser = async (email, password, username) => {
    try {
        const newAccount = await account.create(
            ID.unique(),
            email,
            password,
            username
        )
        if (!newAccount) throw new Error('Error creating account')

        const avatarUrl = avatars.getCredentials(username)
        await signIn(email, password)
        const newUser = await databases.createDocument(
            config.databaseId,
            config.userCollectionId,
            ID.unique(),
            {
                userId: newAccount.$id,
                username,
                email,
                avatar: avatarUrl,
            }
        )
        return newUser
    } catch (err) {
        throw new Error(err)
    }
}

export const signIn = async (email, password) => {
    try {
        const session = await account.createEmailPasswordSession(
            email,
            password
        )
        return session
    } catch (err) {
        throw new Error(err)
    }
}

export const getCurrentUser = async () => {
    try {
        const curretAccount = await account.get()
        if (!curretAccount) throw new Error()

        const currentUser = await databases.listDocuments(
            config.databaseId,
            config.userCollectionId,
            [Query.equal('accountId', curretAccount.$id)]
        )
        if (!currentUser) throw new Error()

        return currentUser.documents[0]
    } catch (err) {
        throw new Error(err)
    }
}
