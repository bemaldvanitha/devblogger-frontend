import { ADD_POST, FETCH_ALL_POSTS, FETCH_SINGLE_POST, ADD_COMMENT, DELETE_COMMENT, ADD_LIKE, ADD_DISLIKE } from "../actions/types";

const initialState = {
    allPosts: [],
    selectedPost: {}
}

const postReducer = (state = initialState, action) => {
    switch (action.type){
        case ADD_POST:
            return state;
        case FETCH_ALL_POSTS:
            return {
                ...state,
                allPosts: action.payload
            }
        case FETCH_SINGLE_POST:
            return {
                ...state,
                selectedPost: action.payload
            }
        case ADD_COMMENT:
            return {
                ...state,
                selectedPost: action.payload
            }
        case DELETE_COMMENT:
            const deletingPost = {...state.selectedPost};
            deletingPost.comments = action.payload;
            return {
                ...state,
                selectedPost: deletingPost
            }
        case ADD_LIKE:
            const likePost = {...state.selectedPost};
            likePost.likes = action.payload;
            return {
                ...state,
                selectedPost: likePost
            }
        case ADD_DISLIKE:
            const dislikePost = {...state.selectedPost};
            dislikePost.likes = action.payload;
            return {
                ...state,
                selectedPost: dislikePost
            }
    }
    return state;
}

export default postReducer;