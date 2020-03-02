import { queryCurrent, queryFakeList } from './service';

const Model = {
  namespace: 'accountCenter',
  state: {
    currentUser: {},
    list: [],
  },
  effects: {
    *fetchCurrent(_, { call, put }) {
      const response = yield call(queryCurrent);
      // Query:  这里下面的 payload是固定写法么? 为什么要把返回数据赋值给payload？ call只之后为什么put？
      yield put({
        type: 'saveCurrentUser',
        payload: response,
      });
    },
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryFakeList, payload);
      // console.log(response)
      yield put({
        type: 'queryList',
        payload: Array.isArray(response) ? response : [],
      });
    },
  },
  reducers: {
    // Query: 这一块的操作？
    //   答：用于处理异步操作，唯一可以修改state地方，由action触发
    //    但是我发现这里都是单纯操作了加了payload   那么这里添加的意义何在？ 还是必须这样添加？
    // Query: 下面的currentUser 必须和 上面的state中的currentUser  保持一致吗? 我感觉好像是的啊
    saveCurrentUser(state, action) {
      return { ...state, currentUser: action.payload };
    },

    queryList(state, action) {
      return { ...state, list: action.payload };
    },
  },
};
export default Model;
