export const saveFormDataToLocalStorage = (formData) => {
  try {
    const existingData = getFormDataFromLocalStorage() || [];
    const updatedData = [...existingData, formData];
    localStorage.setItem("formData", JSON.stringify(updatedData));
    return true;
  } catch (error) {
    console.error("Error saving data to local storage:", error);
  }
};

export function setCurrentUser(data) {
  try {
    return sessionStorage.setItem("activeUserId", JSON.stringify(data));
  } catch (error) {
    throw new Error(error);
  }
}

export const getCurrentUser = () => {
  try {
    const FormData = JSON.parse(sessionStorage.getItem("activeUserId"));
    return FormData;
  } catch (error) {
    throw new Error(error);
  }
};
export const loggedOut = () => {
  sessionStorage.removeItem("activeUserId");
};
export const getFormDataFromLocalStorage = () => {
  try {
    const FormData = JSON.parse(localStorage.getItem("formData")) ?? [];
    // console.log(FormData);
    return FormData;
  } catch (error) {
    console.error("Error retrieving data from local storage:", error);
    return undefined;
  }
};

export const saveAddContactDetails = (contactData) => {
  const sessionData = getCurrentUser();
  const userId = sessionData.userId;
  // console.log("userId", userId);

  const avaiLableData = getAddContactDetails() || [];
  // console.log(contactData);
  if (avaiLableData !== null) {
    const arr = JSON.parse(localStorage.getItem([userId])) || [];
    arr.push(contactData);
    localStorage.setItem([userId], JSON.stringify(arr));
  } else {
    const arr = [];
    arr.push(contactData);
    localStorage.setItem([userId], JSON.stringify(arr));
  }
};

export const getAddContactDetails = () => {
  try {
    const sessionData = getCurrentUser();
    // console.log("SessionData", sessionData);
    const userId = sessionData?.userId;
    const contactData = JSON.parse(localStorage.getItem(userId)) ?? [];
    // console.log("contactData", contactData);
    return contactData;
  } catch (error) {
    console.error("Error saving data to local storage:", error);
  }
};
export const deleteContact = (userId) => {
  const sessionData = getCurrentUser();
  const user = sessionData.userId;
  const contactData = JSON.parse(localStorage.getItem(user)) ?? [];
  const updatedData = contactData.filter((val) => val.userId !== userId);
  localStorage.setItem(user, JSON.stringify(updatedData));
  return true;
};

export const getActiveUser = (userId) => {
  const sessionData = getCurrentUser();
  const activeUser = sessionData.userId;
  return JSON.parse(localStorage.getItem(activeUser)) ?? [];
};

export const setContactInStorage = (userId, editedContact) => {
  return localStorage.setItem(userId, JSON.stringify(editedContact));
};
