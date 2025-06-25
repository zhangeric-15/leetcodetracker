import { useAuthContext } from "./useAuthContext"

const useLogout = () => {
    const { user, dispatch } = useAuthContext();
    // TODO: Add logic to clear JWT Cookies
    function logout() {
        dispatch({ type: 'LOGOUT', payload: null});
    }
    return { user, logout };
}

export default useLogout;