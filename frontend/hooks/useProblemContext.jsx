import { useContext } from "react";
import { ProblemContext } from "../context/ProblemContextProvider";

export function useProblemContext() {
    // REMEMBER: context -> {problems, dispatch}
    const context = useContext(ProblemContext);
    if (!context) {
        throw Error("useProblemContext MUST be defined in a component that is wrapped in ProblemContextProvider component!");
    }
    return context;
}