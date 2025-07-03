import { useQuery } from '@tanstack/react-query'
import { fetchCalles } from '../services/streets'

export const useStreets = () => {
    const { data: calles, isLoading, error } = useQuery({
        queryKey: ['calles'],
        queryFn: fetchCalles,
        refetchOnWindowFocus: false,
        retry: false
    });
    
    return {
        calles,
        isLoading,
        error
    };
}