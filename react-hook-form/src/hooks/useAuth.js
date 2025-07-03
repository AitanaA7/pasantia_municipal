import { useMutation } from '@tanstack/react-query'
import { loginUser } from '../services/auth'

export const useAuth = () => {
    const loginMutation = useMutation({
        mutationFn: loginUser,
        onError: (error) => {
            console.error('Error en login mutation:', error);
        }
    });

    return {
        loginUser: loginMutation.mutate,
        loginUserAsync: loginMutation.mutateAsync,
        isLoggingIn: loginMutation.isPending,
        loginError: loginMutation.error,
        loginSuccess: loginMutation.isSuccess,
        resetLogin: loginMutation.reset
    };
}