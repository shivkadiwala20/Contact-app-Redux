const ADD_CONTACT = "ADD_CONTACT";
const DELETE_CONTACT = "DELETE_CONTACT";

export const addContact = (contactData) => ({
  type: ADD_CONTACT,
  payload: contactData,
});

export const deleteContacts = (userId) => ({
  type: DELETE_CONTACT,
  payload: userId,
});
