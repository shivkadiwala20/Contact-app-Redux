import React from "react";

export const saveFormDataToLocalStorage = (formData) => {
  try {
    const existingData = getFormDataFromLocalStorage() || [];
    const updatedData = [...existingData, formData];
    console.log("Existing Data", existingData);
    // const newData = Object.keys(formData)
    //   .filter((objKey) => objKey !== "confirmpassword")
    //   .reduce((newObj, key) => {
    //     newObj[key] = formData[key];
    //     return newObj;
    //   }, {});

    // console.log("formDataKey", newData);
    localStorage.setItem("formData", JSON.stringify(updatedData));
    return true;
  } catch (error) {
    console.error("Error saving data to local storage:", error);
  }
};

export function setCurrentUser(data) {
  try {
    sessionStorage.setItem("formData", JSON.stringify(data));
    return true;
  } catch (error) {
    throw new Error(error);
  }
}

export const getCurrentUser = () => {
  try {
    const FormData = JSON.parse(sessionStorage.getItem("formData")) ?? [];
    return FormData;
  } catch (error) {
    throw new Error(error);
  }
};

export const getFormDataFromLocalStorage = () => {
  try {
    // const FormData = localStorage.getItem("formData");
    // if (FormData === null) {
    //   return undefined;
    // }
    // return JSON.parse(FormData);
    const FormData = JSON.parse(localStorage.getItem("formData")) ?? [];
    console.log(FormData);
    return FormData;
  } catch (error) {
    console.error("Error retrieving data from local storage:", error);
    return undefined;
  }
};

// export const saveAddContactDetails = (contactData) => {
//   try {
//     const avaiLableData = getAddContactDetails() || [];
//     const newData = [...avaiLableData, contactData];
//     console.log(contactData);
//     localStorage.setItem("contactData", JSON.stringify(newData));
//     return true;
//   } catch (error) {
//     throw new Error(error);
//   }
// };

export const saveAddContactDetails = (contactData) => {
  const sessionData = getCurrentUser();
  const userId = sessionData.userId;
  // console.log("userId", userId);

  const avaiLableData = getAddContactDetails() || [];
  console.log(contactData);
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
    console.log("SessionData", sessionData);
    const userId = sessionData.userId;
    const contactData = JSON.parse(localStorage.getItem(userId)) ?? [];

    console.log("contactData", contactData);
    return contactData;
  } catch (error) {
    throw new Error(error);
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

// export const editContact = (userId, updatedData) => {
//   const sessionData = getCurrentUser();
//   const user = sessionData.userId;
//   const contactData = JSON.parse(localStorage.getItem(user)) ?? [];
//   const updatedContactData = contactData.map((val) => {
//     if (val.userId === userId) {
//       return updatedData;
//     }
//     return val;
//   });
//   console.log("updatedData", updatedData);
//   localStorage.setItem(user, JSON.stringify(updatedContactData));
//   return true;
// };

export const editContact = (userId) => {
  const sessionData = getCurrentUser();
  const activeUser = sessionData.userId;
  console.log("activeUser", activeUser);
  return JSON.parse(localStorage.getItem(activeUser)) ?? [];
  // console.log("contactData", contactData);
  // const updatedContactData = contactData.find((val) => val.userId === userId);
  // console.log("updatedData", updatedContactData);
  // return JSON.parse(localStorage.getItem(userId)) ?? [];
};

export const setContactInStorage = (userId, editedContact) => {
  // const sessionData = getCurrentUser();
  // const activeUser = sessionData.userId;
  return localStorage.setItem(userId, JSON.stringify(editedContact));
};
