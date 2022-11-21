import * as React from 'react';

import {
  CreateStoreReturn,
  Dispatch,
  DispatchDefaultType,
  SetProps,
  StoreDefaultType,
  UseDispatchProps,
  UseStoreProps,
} from './createStore.decl';
import { useSnapshot } from './useSnapshot';

export function createStore<
  T_Store extends StoreDefaultType,
  T_Dispatch extends DispatchDefaultType | undefined = undefined,
>(
  initialState: T_Store,
  dispatch?: Dispatch<T_Store, T_Dispatch>,
): CreateStoreReturn<T_Store, T_Dispatch> {
  function useCreateStore() {
    const state = React.useRef(initialState);

    const subscribers = new Set<() => void>();
    const subscribe = (callback: () => void) => {
      subscribers.add(callback);
      return () => subscribers.delete(callback);
    };
    const get = () => state.current;
    const set = (setter: SetProps<T_Store>) => {
      if (typeof setter === 'function') {
        state.current = { ...state.current, ...setter(state.current) };
      } else {
        state.current = { ...state.current, ...setter };
      }
      subscribers.forEach((callback) => callback());
    };
    const update = dispatch ? dispatch(set, get) : ({} as T_Dispatch);

    return { get, set, subscribe, update };
  }

  type UseStore = ReturnType<typeof useCreateStore>;
  const Store = React.createContext<UseStore | null>(null);

  function Provider(props: { children: React.ReactNode }) {
    const data = useCreateStore();
    const value = React.useMemo(() => data, []);

    return <Store.Provider value={value} {...props} />;
  }

  function useStore<T_SelectorOutput>(
    selector: UseStoreProps<T_Store, T_SelectorOutput>,
  ) {
    const store = React.useContext(Store);
    const createSnapshot = useSnapshot<T_SelectorOutput>();

    if (!store) {
      throw new Error('useStore must be used within its Provider');
    }

    const getSnapshot = () =>
      createSnapshot(selector({ ...store.get(), setStore: store.set }));

    return React.useSyncExternalStore(store.subscribe, getSnapshot);
  }

  function useDispatch<T_SelectorOutput>(
    selector: UseDispatchProps<T_Dispatch, T_SelectorOutput>,
  ) {
    const store = React.useContext(Store);

    if (!store) {
      throw new Error('useDispatch must be used within its Provider');
    }

    return selector(store.update);
  }

  return { Provider, useStore, useDispatch };
}
