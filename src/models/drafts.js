import { fromJS } from 'immutable';
import * as API from '../constants/API';
import * as types from '../constants/ActionTypes';
import { ajax } from '../core/common';

export const actions = {
    fetchDrafts() {
        return {
            type: types.FETCH_DRAFTS
        };
    },
    receiveDrafts(data) {
        const { success, drafts } = data;
        return {
            type: types.RECEIVE_DRAFTS,
            items: drafts,
            success
        };
    }
};

function fetchDrafts() {
    return ajax({
        url: API.FETCH_DRAFTS
    });
}

export default {
    state: 'drafts',

    effects: {
        *[types.FETCH_DRAFTS](action, { call, put }) {
            const data = yield call(fetchDrafts);
            yield put(actions.receiveDrafts(data));
        }
    },

    reducer: [
        fromJS({
            isFetching: false,
            items: []
        }),
        {
            [types.FETCH_DRAFTS](state) {
                return state.setIn(['isFetching'], true);
            },
            [types.RECEIVE_DRAFTS](state, action){
                return state
                    .setIn(['success'], action.success)
                    .setIn(['items'], fromJS(action.items))
                    .setIn(['isFetching'], false);
            }
        }
    ]
};