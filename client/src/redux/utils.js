import * as api from '../api/api';
import {showMessage, startLoading, stopLoading} from './reducers/main';

export const asyncActionWrapper = (callback, handler, params = {useLoader: true}) => {
  const {useLoader} = params;

  return dispatch => {
    if (useLoader) dispatch( startLoading() );

    callback().then(res => {
      dispatch( handler(res.data) );
    }).catch(err => {
      dispatch( showMessage(err.message, 'danger') );
    }).finally(() => {
      if (useLoader) dispatch( stopLoading() );
    });
  }
}

export const updateCommentsById = (array, id, data) => {
  const callback = item => {
    if (item.id === id) {
      return {...item, kids: data && mergeComments(item.kids, data)};
    } else if (item.kids) {
      return {...item, kids: item.kids.map(callback)};
    } else {
      return item;
    }
  }

  return array?.map(callback);
}

export const mergeComments = (prevData, newData) => {
  if (!prevData) return newData;

  const kids = prevData.reduce((acc, item) => {
    acc[item.id] = item.kids;
    return acc;
  }, {});

  return newData.map(item => {
    const itemKids = kids[item.id];

    if (itemKids) return {...item, kids: itemKids};

    return item;
  });
}

export const updateAllComments = async (id, comments) => {
  if (!comments) return await api.getComments(id);

  const {data} = await api.getComments(id);

  const callback = async item => {
    if (item.kids) {
      const newData = (await api.getComments(item.id)).data;
      const mergedComments = await Promise.all(
        mergeComments(item.kids, newData).map(callback)
      );
      return {...item, kids: mergedComments};
    }
    return item;
  }

  const newData = await Promise.all(
    mergeComments(comments, data).map(callback)
  );

  return {data: newData};
}