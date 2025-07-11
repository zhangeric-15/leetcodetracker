import { useAuthContext } from "./useAuthContext"
import { useProblemContext } from "./useProblemContext";

const useLogout = () => {
    const { user, dispatch: authDispatch } = useAuthContext();
    const { dispatch: problemDispatch } = useProblemContext();
    // TODO: Add logic to clear JWT Cookies
    async function logout() {
        const response = await fetch('http://localhost:5001/api/users/logout', {
            method: 'POST',
            credentials: 'include'
        });
        authDispatch({ type: 'LOGOUT', payload: null});
        problemDispatch({type: 'SET_PROBLEMS', payload: null})
    }
    return { user, logout };
}

export default useLogout;