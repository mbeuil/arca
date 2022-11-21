# Archa

Lightweight solution to create custom React context. Build with typescript,
untop useContext and useSyncExternalStore.

[Demo](https://codesandbox.io/s/archa-demo-g56y7z?file=/src/App.tsx)

Install it with :

```
npm i archa
```

To create your custom context use the `createStore` function. It takes 2
arguments:

- initialSate, an object with your states.
- dispatch (optional), a callback exposing `set` and `get` methods to create a
  list of functions to mutate your states.

```
const { Provider, useStore } = createStore({
  string: ''
});
```

and return:

- Provider
- useStore, expose all state and a setStore method. Trigger a rerender of your
  component only when one of the returned state is mutate. If dipatch were
  provided setStore will not be expose.
- useDispatch, expose all dispatch functions

  ```
  const [state1, setStore] = useStore((store) => [store.state1 store.setStore]);
  const function1 = useDispatch((dispatch) => dispatch.function1);
  ...
  setStore(({ string }) => ({ string: newString })

  ```

## Example without dispatch

```ts
import { createStore } from 'archa';

const { Provider, useStore } = createStore({
  count: 0,
});

function Count() {
  const setStore = useStore(({ setStore }) => setStore);

  return (
    <button onClick={() => setStore(({ count }) => ({ count: count + 1 }))}>
      Increment count
    </button>
    <button onClick={() => setStore(({ count }) => ({ count: count - 1 }))}>
      Decrement count
    </button>
  );
}

function CountDisplay() {
  const count = useStore(({ count }) => count);

  return <span>{`The current count is ${count}.`}</span>;
}

export function Counter() {
  return (
    <Provider>
      <CountDisplay />
      <Count />
    </Provider>
  );
}
```

## Example with dispatch

```ts
import { createStore } from 'archa';

const { Provider, useStore, useDispatch } = createStore(
  {
    count: 0,
  },
  (set, get) => ({
    addCount: () => {
      const { count } = get();
      set({ count: count + 1 }):
    },
    removeCount: () => {
      const { count } = get();
      set({ count: count - 1 }):
    }
  }),
);

function Count() {
  const [ addCount, removeCount ] = useDispatch((dispatch) => [
    dispatch.addCount, dispatch.removeCount
  ]);

  return (
    <button onClick={addCount}>
      Increment count
    </button>
    <button onClick={removeCount}>
      Decrement count
    </button>
  );
}

function CountDisplay() {
  const count = useStore((store) => store.count);

  return (
    <span>{`The current count is ${count}.`}</span>
  );
}

export function Counter() {
  return (
    <Provider>
      <CountDisplay />
      <Count />
    </Provider>
  );
}
```
