import { useContext } from "react";
import { AuthContext } from "../context/AuthContextProvider";

export function useAuthContext() {
    // REMEMBER: context -> {user, dispatch}
    const context = useContext(AuthContext);
    if (!context) {
        throw Error("useAuthContext MUST be defined in a component that is wrapped in AuthContextProvider component!");
    }
    return context;
}