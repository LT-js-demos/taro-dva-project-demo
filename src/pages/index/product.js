import createAction from '../../utils/action'

export default {
  namespace: 'products',
  state: {
    id: 0,
    userName: 'Leonard',
    list: []
  },
  reducers: {
    updateState(state, {payload}) {
      return {
        ...state,
        ...payload
      }
    }
  },
  effects: {
    * init(action, {select, put}) {
      const {list, id} = yield select(({products}) => products)
      let newId = id
      const initData = [
        {productName: '11111', id: ++newId},
        {productName: '2222', id: ++newId}
      ]
      yield put(createAction('updateState', {id: newId, list: [...list, ...initData]}))
    },

    * delete({payload: {id}}, {select, put}) {
      const {list} = yield select(({products}) => products)
      const newlist = list.filter(item => item.id !== id)
      const newObj = {list: [...newlist]}
      yield put(createAction('updateState', newObj))
    },

    * add({payload: {inputValue}}, {select, put}) {
      const {list, id} = yield select(({products}) => products)
      const newId = id + 1
      yield put(createAction('updateState', {
        id: newId,
        list: [...list, {productName: inputValue, id: newId}]
      }))
    }

  }
};
