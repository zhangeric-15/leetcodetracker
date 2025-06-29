import { useAuthContext } from "./useAuthContext"

const useLogout = () => {
    const { user, dispatch } = useAuthContext();
    // TODO: Add logic to clear JWT Cookies
    async function logout() {
        const response = await fetch('http://localhost:5001/api/users/logout', {
            method: 'POST',
            credentials: 'include'
        });
        dispatch({ type: 'LOGOUT', payload: null});
    }
    return { user, logout };
}

export default useLogout;