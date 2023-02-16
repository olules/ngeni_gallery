// Action types
export const SET_IMAGES = "SET_IMAGES";
export const ADD_IMAGE = "ADD_IMAGE";
export const UPDATE_IMAGE = "UPDATE_IMAGE";
export const DELETE_IMAGE = "DELETE_IMAGE";
export const SET_CURRENT_IMAGE = "SET_CURRENT_IMAGE";
export const CLEAR_CURRENT_IMAGE = "CLEAR_CURRENT_IMAGE";
export const SET_ERROR = "SET_ERROR";
export const CLEAR_ERROR = "CLEAR_ERROR";

// Action creators
export const setImages = (images) => {
  return { type: SET_IMAGES, payload: images };
};

export const addImage = (image) => {
  return { type: ADD_IMAGE, payload: image };
};

export const updateImage = (image) => {
  return { type: UPDATE_IMAGE, payload: image };
};

export const deleteImage = (id) => {
  return { type: DELETE_IMAGE, payload: id };
};

export const setCurrentImage = (image) => {
  return { type: SET_CURRENT_IMAGE, payload: image };
};

export const clearCurrentImage = () => {
  return { type: CLEAR_CURRENT_IMAGE };
};

export const setError = (error) => {
  return { type: SET_ERROR, payload: error };
};

export const clearError = () => {
  return { type: CLEAR_ERROR };
};
