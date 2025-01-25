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

        const avatarUrl = avatars.getInitials(username)
        await signIn(email, password)
        const newUser = await databases.createDocument(
            config.databaseId,
            config.userCollectionId,
            ID.unique(),
            {
                accountId: newAccount.$id,
                username,
                email,
                avatar: avatarUrl.href,
            }
        )
        return newUser
    } catch (err) {
        throw new Error(err)
    }
}

export const checkSession = async () => {
    try {
        const currentSession = await account.get()
        return currentSession // Retorna os detalhes da sessão atual, se existir
    } catch (err) {
        console.log('Nenhuma sessão ativa:', err)
        return null
    }
}

export const signIn = async (email, password) => {
    try {
        const existingSession = await checkSession()
        if (existingSession) {
            const currentUserEmail = existingSession.email // Ajuste conforme o retorno do SDK
            console.log('Usuário da sessão ativa:', currentUserEmail)
            console.log('Usuário da nova sessão é', email)

            if (currentUserEmail === email) {
                // Se o mesmo usuário, retorna a sessão ativa
                console.log('Já está logado como:', currentUserEmail)
                return existingSession
            }

            // Se outro usuário, encerra a sessão atual
            console.log('Sessão atual é de outro usuário. Encerrando...')
            await signOut()
        }

        const signInData = await account.createEmailPasswordSession(
            email,
            password
        )
        console.log('Sessão criada:', signInData)
        return signInData
    } catch (err) {
        throw new Error(`Erro ao fazer login: ${err.message}`)
    }
}
export const signOut = async () => {
    try {
        await account.deleteSession('current') // Força o logout da sessão atual
        console.log('Sessão encerrada com sucesso.')
    } catch (err) {
        console.error('Erro ao encerrar sessão:', err)
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
/**
 * @param {function} getAllPosts - function to get all posts
    
 } } email The email address
 */

export const getAllPosts = async () => {
    try {
        const allPosts = await databases.listDocuments(
            config.databaseId,
            config.videoCollectionId
        )
        if (!allPosts) throw new Error()
        return allPosts.documents
    } catch (err) {
        throw new Error(err)
    }
}
