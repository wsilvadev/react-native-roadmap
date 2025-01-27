const { useEffect, useState } = require('react')
import { Alert } from 'react-native'
type UseAppwrite = {
    data: any
    isLoading: boolean
    refetch: () => Promise<void>
}
export const useAppwrite = (fn: () => Promise<any[]>): UseAppwrite => {
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const fetchData = async () => {
        setIsLoading(true)
        try {
            const response = await fn()
            setData(response)
        } catch (error: unknown) {
            Alert.alert('Error', (error as Error).message)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const refetch = () => fetchData()

    return { data, isLoading, refetch }
}

export default useAppwrite
