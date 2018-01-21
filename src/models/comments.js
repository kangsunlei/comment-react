import { fromJS } from 'immutable';
import * as types from '../constants/ActionTypes';

export const actions = {
    initComments(){
        return {
            type: types.INIT_COMMENTS
        };
    },

    receiveComments(comments) {
        return {
            type: types.RECEIVE_COMMENTS,
            comments
        };
    },

    addComment(comment){
        return {
            type: types.ADD_COMMENT,
            comment
        };
    },

    deleteComment(index){
        return {
            type: types.DELETE_COMMENT,
            index
        };
    }
};

function initComments() {
    const comments = localStorage.getItem('comments');
    return comments ? JSON.parse(comments) : [];
}

function addComment(comment) {
    let comments = localStorage.getItem('comments');
    comments = comments ? JSON.parse(comments) : [];
    comments.push(comment);
    localStorage.setItem('comments', JSON.stringify(comments));
    return comments;
}

function deleteComment(index) {
    let comments = localStorage.getItem('comments');
    comments = comments ? JSON.parse(comments) : [];
    comments.splice(index, 1);
    localStorage.setItem('comments', JSON.stringify(comments));
    return comments;
}

export default {
    state: 'comments',
    effects: {
        *[types.INIT_COMMENTS](action, { call, put }) {
            const data = yield call(initComments);
            yield put(actions.receiveComments(data));
        },
        *[types.ADD_COMMENT](action, { call, put }) {
            const data = yield call(addComment, action.comment);
            yield put(actions.receiveComments(data));
        },
        *[types.DELETE_COMMENT](action, { call, put }) {
            const data = yield call(deleteComment, action.index);
            yield put(actions.receiveComments(data));
        }
    },
    reducer: [
        fromJS({
            items:[]
        }),
        {
            [types.RECEIVE_COMMENTS](state, action) {
                return state.setIn(['items'], fromJS(action.comments));
            }
        }
    ]
}
