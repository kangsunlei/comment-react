import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware, { takeLatest } from 'redux-saga';
import { call, put, fork, wait } from 'redux-saga/effects';
import models from '../models';
import logger from 'redux-logger';

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];

middlewares.push(logger);

// handle models
const sagas = [];
const reducers = {};

function mockReducers(model, index, types, reducer) {
    let actionMap = {};

    if (!model.reducers[index]) {
        model.reducers[index] = [];
        model.reducers[index].push(reducer[0]);
    } else {
        actionMap = model.reducers[index][1] || {};
    }

    types.forEach(type => {
        if (reducer[1][type] && !actionMap[type]) actionMap[type] = reducer[1][type];
    });

    model.reducers[index][1] = actionMap;
}

function findModel(models, state) {
    for (let i = 0, l = models.length; i < l; i++) {
        if (models[i].state === state) return models[i];
    }

    return false;
}

models.forEach(m => {
    for (let action_type in m.effects) {
        const fn = takeLatest;

        sagas.push(fork(function* () {
            yield* fn(action_type, action => {
                return m.effects[action_type](action, { call, put, wait });
            });
        }));
    }

    if (m.reducerMap) {
        if (!m.reducers) m.reducers = {};
        m.reducerMap.forEach(mapItem => {
            const [mapState, types] = [...mapItem];
            const model = findModel(models, mapState);
            if (model.reducer) {
                mockReducers(m, mapState, types, model.reducer);
            } else if (model.reducers) {
                for (let index in model.reducers) {
                    const modelReducer = model.reducers[index];
                    mockReducers(m, index, types, modelReducer);
                }
            }
        });
    }

    if (m.reducers) {
        const modelReducers = {};
        for (let state in m.reducers) {
            modelReducers[state] = createReducer(...m.reducers[state]);
        }
        reducers[m.state] = combineReducers(modelReducers);
    } else if (m.reducer) {
        reducers[m.state] = createReducer(...m.reducer);
    }
});

// create root saga
const rootSaga = function* root() { yield sagas; };
// combine root reducers
const rootReducer = combineReducers(reducers);

export default function configureStore(initialState) {
    const store = createStore(
        rootReducer,
        initialState,
        compose(
            applyMiddleware(...middlewares),
            window.devToolsExtension ? window.devToolsExtension() : f => f
        )
    );
    sagaMiddleware.run(rootSaga);
    return store;
}

function createReducer(initialState, handlers) {
    return function reducer(state = initialState, action) {
        if (handlers.hasOwnProperty(action.type)) {
            return handlers[action.type](state, action);
        } else {
            return state;
        }
    };
}