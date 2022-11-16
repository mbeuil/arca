# Archa

Lightweight solution to create custom React context. Build untop useContext and
useSyncExternalStore.

Install it with :

```
npm i archa
```

To create your custom context use the `createStore` function. It takes 2
arguments:

```
const { Provider, useStore } = createStore({
  string: ''
});
```

- initialSate, an object with your states.
- dispatch (optional), a callback exposing `set` and `get` methods to create a
  list of functions to mutate your states.

and return:

- Provider
- useStore, expose all state and dispatch, expose instead a setStore method if
  no dispatch were passed to `createStore`, and trigger a rerender of your
  component each time one of the returned state is mutate.

  ```
  const [setStore] = useStore((store) => [store.state store.setStore]);
  ...
  setStore(({ string }) => ({ string: newString })

  ```

## Example without dispatch

```
const { Provider, useStore } = createStore({
  count: 0,
});

function Count() {
  const setStore = useStore((store) => store.setStore);

  return (
    <button onClick={() => setStore(({ count }) => ({ count: count + 1 }))}>
      Increment count
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

## Example with dispatch

```
import { createStore } from 'archa';

const { Provider, useStore } = createStore(
  {
    first: '',
    last: '',
  },
  (set, _get) => ({
    updatefirst: (value: string) => set({ first: value }),
    updatelast: (value: string) => set({ last: value }),
  }),
);

const FirstInput = () => {
  const [first, updateFirst] = useStore((store) => [
    store.first,
    store.updateFirst,
  ]);

  return (
    <input value={first} onChange={(e) => updateFirst(e.target.value)} />
  );
};

...

function Form() {
  return (
    <Provider>
      <FirstInput />
      <LastInput />
    </Provider>
  );
}
```
