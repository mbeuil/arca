import * as React from 'react';
import { createStore } from '../../src/createStore';
import { useRenderCounter } from './useRenderCounter';

const { Provider, useStore } = createStore({
  count: 0,
});

function Count() {
  const setStore = useStore((store) => store.setStore);
  const RenderCounter = useRenderCounter();

  return (
    <div
      style={{
        margin: '5px 0',
        borderRadius: '8px',
        backgroundColor: 'lightgray',
        padding: '8px 16px',
        display: 'grid',
        gridTemplateColumns: 'auto 1fr',
      }}>
      <button onClick={() => setStore(({ count }) => ({ count: count + 1 }))}>
        Increment count
      </button>
      {RenderCounter}
    </div>
  );
}

function CountDisplay() {
  const count = useStore((store) => store.count);
  const RenderCounter = useRenderCounter();

  return (
    <div
      style={{
        margin: '5px 0',
        borderRadius: '8px',
        backgroundColor: 'lightgray',
        padding: '8px 16px',
        display: 'grid',
        gridTemplateColumns: 'auto 1fr',
      }}>
      <span>{`The current count is ${count}. `}</span>
      {RenderCounter}
    </div>
  );
}

const ContentContainer = React.memo(() => {
  return (
    <div
      style={{
        fontFamily: 'system-ui',
        width: '500px',
      }}>
      <div>CounterContainer</div>
      <CountDisplay />
      <Count />
    </div>
  );
});

export function Counter() {
  return (
    <Provider>
      <ContentContainer />
    </Provider>
  );
}
