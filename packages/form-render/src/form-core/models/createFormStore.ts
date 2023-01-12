import { createStore as create } from 'zustand';
import { createContext, useContext } from 'react'
import type { StoreApi } from 'zustand';
import { _set, _get, _has, _cloneDeep } from '../../utils';
import { flattenSchema as flatten } from '../../utils/flattenSchema';

type FormStore = {
  schema?: any;
  flattenSchema: any;
  context?: any;
  isInit: boolean,
  init?: (schema: FormStore['schema']) => any;
  setContext: (context: any) => any;
  setSchema: (schema: any) => any;
};

// 将 useStore 改为 createStore， 并把它改为 create 方法
export const createStore = () => create((setState, getState) => ({
  isInit: false,
  schema: {},
  flattenSchema: {},
  context: {},
  
  init: schema => {
    const flattenSchema = flatten(schema);
    return setState({ schema, isInit: true, flattenSchema });
  },

  setContext: (context: any) => {
    return setState({ context });
  },

  setSchema: (schema: any) => {
    const flattenSchema = flatten(schema);
    return setState({ schema, flattenSchema });
  }
}));


export const useStore = () => {}
