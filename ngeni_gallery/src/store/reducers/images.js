import {
  SET_IMAGES,
  ADD_IMAGE,
  UPDATE_IMAGE,
  DELETE_IMAGE,
  SET_CURRENT_IMAGE,
  CLEAR_CURRENT_IMAGE,
  SET_ERROR,
  CLEAR_ERROR,
} from "../actions/images.js";

const initialState = {
  images: [],
  currentImage: null,
  error: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_IMAGES:
      return { ...state, images: action.payload };
    case ADD_IMAGE:
      return { ...state, images: [...state.images, action.payload] };
    case UPDATE_IMAGE:
      return {
        ...state,
        images: state.images.map((image) =>
          image._id === action.payload._id ? action.payload : image
        ),
      };
    case DELETE_IMAGE:
      return {
        ...state,
        images: state.images.filter((image) => image._id !== action.payload),
      };
    case SET_CURRENT_IMAGE:
      return { ...state, currentImage: action.payload };
    case CLEAR_CURRENT_IMAGE:
      return { ...state, currentImage: null };
    case SET_ERROR:
      return { ...state, error: action.payload };
    case CLEAR_ERROR:
      return { ...state, error: null };
    default:
      return state;
  }
};

export default reducer;
