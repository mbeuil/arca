import * as React from 'react';
import { storiesOf } from '@storybook/react';

import { Form } from '../components/Form';
import { Counter } from '../components/Counter';
import { useRenderCounter } from '../hooks/useRenderCounter';

const stories = storiesOf('createStore', module);

stories.add('all cases', () => {
  const [_, forceAppRerender] = React.useState({});
  const RenderCounter = useRenderCounter();

  return (
    <>
      <div
        style={{
          fontFamily: 'system-ui',
          width: '468px',
          margin: '5px 0',
          borderRadius: '8px',
          backgroundColor: 'lightgray',
          padding: '8px 16px',
          display: 'grid',
          gridTemplateColumns: 'auto 1fr',
        }}>
        <button onClick={forceAppRerender}>Force app rerender</button>
        {RenderCounter}
      </div>
      <Form />
      <Counter />
    </>
  );
});
