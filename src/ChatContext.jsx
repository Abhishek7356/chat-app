import React, { createContext, useContext, useReducer } from 'react'
import { AuthContext } from './Auth'

export const StateContext = createContext()
export const DispatchContext = createContext()

function ChatContext({ children }) {

    const currentUser = useContext(AuthContext)

    const initialState = {
        user: {},
        chatId: "null"
    }

    const reducer = (state, action) => {
        switch (action.type) {
            case "CHANGED_USER":
                return {
                    user: action.payload,
                    chatId: currentUser.uid > action.payload.uid
                        ? currentUser.uid + action.payload.uid
                        : action.payload.uid + currentUser.uid
                }

            default:
                return state
        }
    }

    const [state, dispatch] = useReducer(reducer, initialState)
    console.log(state);
    return (
        <div>
            <DispatchContext.Provider value={dispatch}>
                <StateContext.Provider value={state}>
                    {children}
                </StateContext.Provider>
            </DispatchContext.Provider>
        </div>
    )
}

export default ChatContext