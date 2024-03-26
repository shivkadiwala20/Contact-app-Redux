import {
  getAddContactDetails,
  saveAddContactDetails,
} from "../Storage/Storage";

const initialState = getAddContactDetails();

console.log("intialState", initialState);
export const contactReducer = (state = initialState, action) => {
  console.log("ee", state);
  switch (action.type) {
    case "ADD_CONTACT":
      const newState = [...state, action.payload];
      saveAddContactDetails(action.payload);
      console.log("Action payload", action.payload);
      return newState;

    case "DELETE_CONTACT":
      return {
        ...state,
        contacts: state.contacts.filter(
          (contact) => contact.userId !== action.payload
        ),
      };
    default:
      return state;
  }
};
