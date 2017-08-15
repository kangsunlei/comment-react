// action types
const INIT_COMMNETS = 'INIT_COMMNETS'
const ADD_COMMENT = 'ADD_COMMENT'
const DELETE_COMMENT = 'DELETE_COMMENT'
const MODIFY_COMMENT = 'MODIFY_COMMENT'

// reducer
export default function (state, action) {
  if (!state) {
    state = {
      comments: []
    }
  }
  switch (action.type) {
    case INIT_COMMNETS:
      // 初始化评论
      return {
        comments: action.comments
      }
    case ADD_COMMENT:
      // 新增评论
      return {
        comments: [...state.comments, action.comment]
      }
    case DELETE_COMMENT:
      // 删除评论
      return {
        comments: [
          ...state.comments.slice(0, action.commentIndex),
          ...state.comments.slice(action.commentIndex + 1)
        ]
      }
    case MODIFY_COMMENT:
      // 修改评论
      console.log(action)
      return {
        commentID: action.comment,
        showMask: action.showMask,
        comments: [...state.comments]
      }
    default:
      return state
  }
}

// action creators
export const initComments = (comments) => {
  return {
    type: INIT_COMMNETS,
    comments
  }
}

export const addComment = (comment) => {
  return {
    type: ADD_COMMENT,
    comment
  }
}

export const deleteComment = (commentIndex) => {
  return {
    type: DELETE_COMMENT,
    commentIndex
  }
}

export const modifyComment = (comment, showMask) => {
  return {
    type: MODIFY_COMMENT,
    comment,
    showMask
  }
}