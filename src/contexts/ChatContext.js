import { createContext, useContext, useReducer } from "react";
import { AuthContext } from "./AuthContext";

export const ChatContext = createContext();

// Create a provider component for ChatContext
export const ChatContextProvider = ({ children }) => {
  // Get the current user from the AuthContext
  const { currentUser } = useContext(AuthContext);

  // Define the initial state of the chat
  const INITIAL_STATE = {
    chatId: "null",
    user: {},
  };

  // Define the reducer function for chat state management
  const chatReducer = (state, action) => {
    switch (action.type) {
      case "CHANGE_USER":
        // If the user changes, update the user and chatId based on the new user's uid
        return {
          user: action.payload,
          chatId:
            currentUser.uid > action.payload.uid
              ? currentUser.uid + action.payload.uid
              : action.payload.uid + currentUser.uid,
        };

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

  return (
    <ChatContext.Provider value={{ data: state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};
