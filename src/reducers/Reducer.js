import {
  deleteContact,
  getAddContactDetails,
  getCurrentUser,
  // importContacts,
  saveAddContactDetails,
  updatedData,
  // setContactInStorage,
} from '../storage/Storage';

const initialState = getAddContactDetails();

export const contactReducer = (state = initialState, action) => {
  console.log('ee', state);
  switch (action.type) {
    case 'ADD_CONTACT': {
      const newState = [...state, action.payload];
      const sessionData = getCurrentUser();
      const activeUser = sessionData?.userId;
      console.log('ReduxUserId', activeUser);
      saveAddContactDetails(action.payload, activeUser);
      console.log('Action payload', action.payload);
      return newState;
    }
    case 'DELETE_CONTACT': {
      const deletedState = state.filter((val) => val.userId !== action.payload);
      deleteContact(action.payload);
      console.log('DeletedState', deletedState);
      return deletedState;
    }
    case 'UPDATE_CONTACT': {
      updatedData(action.payload);
      const updatedState = state.map((val) =>
        val.userId === action.payload.userId ? action.payload : val
      );
      console.log('UpdatedState', updatedState);
      return updatedState;
    }
    case 'IMPORT_CONTACT': {
      const newState = [...state, ...action.payload];
      // saveAddContactDetails(action.payload);
      console.log('Action payload', action.payload);
      return newState;
    }

    default:
      return state;
  }
};
