import {
  deleteContact,
  getAddContactDetails,
  saveAddContactDetails,
} from "../Storage/Storage";

const initialState = {
  contacts: getAddContactDetails(),
};

console.log("intialState", initialState);
export const contactReducer = (state = initialState, action) => {
  console.log("ee", state);
  switch (action.type) {
    case "ADD_CONTACT":
      const newState = [...state.contacts, action.payload];
      saveAddContactDetails(action.payload);
      console.log("Action payload", action.payload);
      return newState;

    case "DELETE_CONTACT":
      const deletedState = state.filter((val) => val.userId !== action.payload);
      deleteContact(action.payload);
      console.log("DeletedState", deletedState);
      return deletedState;

    default:
      return state;
  }
};
