// action types
const INIT_COMMNETS = 'INIT_COMMNETS';
const ADD_COMMENT = 'ADD_COMMENT';
const DELETE_COMMENT = 'DELETE_COMMENT';
const MODIFY_COMMENT = 'MODIFY_COMMENT';

// reducer
export default function (state, action) {
  if (!state) {
    state = {
      comments: []
    };
  }
  switch (action.type) {
    case INIT_COMMNETS:
      // 初始化评论
      return {
        comments: action.comments
      };
    case ADD_COMMENT:
      // 新增评论
      if(action.index !== undefined){
        if(action.index !== -1) state.comments[action.index] = action.comment;
        state.showMask = false;
      } else {
        state.comments = [...state.comments, action.comment];
      }
      return {...state};
    case DELETE_COMMENT:
      // 删除评论
      state.comments = [
        ...state.comments.slice(0, action.commentIndex),
        ...state.comments.slice(action.commentIndex + 1)
      ];
      return {...state};
    case MODIFY_COMMENT:
      state.modifyIndex = action.commentIndex;
      state.showMask = true;
      return {...state};
    default:
      return state;
  }
}

// action creators
export const initComments = (comments) => {
  return {
    type: INIT_COMMNETS,
    comments
  };
};

export const addComment = (comment, index) => {
  return {
    type: ADD_COMMENT,
    comment,
    index
  };
};

export const deleteComment = (commentIndex) => {
  return {
    type: DELETE_COMMENT,
    commentIndex
  };
};

export const modifyComment = (commentIndex) => {
  return {
    type: MODIFY_COMMENT,
    commentIndex
  };
};