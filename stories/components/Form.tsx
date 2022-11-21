import * as React from 'react';

import { createStore } from '../../src/createStore';
import { useRenderCounter } from './useRenderCounter';

const { Provider, useStore, useDispatch } = createStore(
  {
    first: '',
    last: '',
  },
  (set) => ({
    updatefirst: (value: string) => set({ first: value }),
    updatelast: (value: string) => set({ last: value }),
  }),
);

const TextInput = ({ value }: { value: 'first' | 'last' }) => {
  const fieldValue = useStore((store) => store[value]);
  const updateField = useDispatch((dispatch) => dispatch[`update${value}`]);

  const RenderCounter = useRenderCounter();

  return (
    <div
      style={{
        margin: '5px 0',
        borderRadius: '8px',
        backgroundColor: 'lightgray',
        padding: '8px 16px',
        display: 'grid',
        gridTemplateColumns: 'auto auto 1fr',
      }}>
      {value}:{' '}
      <input value={fieldValue} onChange={(e) => updateField(e.target.value)} />
      {RenderCounter}
    </div>
  );
};

const Display = ({ value }: { value: 'first' | 'last' }) => {
  const fieldValue = useStore((store) => store[value]);
  const RenderCounter = useRenderCounter();

  return (
    <div
      style={{
        margin: '5px 0',
        borderRadius: '8px',
        backgroundColor: 'lightgray',
        padding: '8px 16px',
        display: 'grid',
        gridTemplateColumns: 'auto auto 1fr',
      }}>
      <span>{`${value} : `}</span>
      <span>{fieldValue}</span>
      {RenderCounter}
    </div>
  );
};

const FormContainer = () => {
  return (
    <div>
      <div>FormContainer</div>
      <TextInput value="first" />
      <TextInput value="last" />
    </div>
  );
};

const FullName = () => {
  const [first, last] = useStore(
    React.useCallback((store) => [store.first, store.last], []),
  );
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
      <span>{`fullname : ${first} ${last}`}</span>
      {RenderCounter}
    </div>
  );
};

const DisplayContainer = () => {
  return (
    <div>
      <div>DisplayContainer</div>
      <Display value="first" />
      <Display value="last" />
      <FullName />
    </div>
  );
};

const ContentContainer = React.memo(() => {
  return (
    <div
      style={{
        fontFamily: 'system-ui',
        width: '500px',
      }}>
      <FormContainer />
      <DisplayContainer />
    </div>
  );
});

export function Form() {
  return (
    <Provider>
      <ContentContainer />
    </Provider>
  );
}
