import { useAuthContext } from "./useAuthContext"

const useLogout = () => {
    const { user, dispatch } = useAuthContext();
    function logout() {
        dispatch({ type: 'LOGOUT', payload: null});
    }
    return { user, logout };
}

export default useLogout;