import * as React from 'react';

export function useRenderCounter() {
  const ref = React.useRef<HTMLSpanElement | null>(null);

  React.useEffect(() => {
    if (ref.current) {
      ref.current.textContent = (
        Number(ref.current.textContent || '0') + 1
      ).toString();
    }
  });

  return (
    <span
      style={{
        color: 'white',
        borderRadius: 4,
        padding: '2px 4px',
        fontSize: '0.8rem',
        marginLeft: 'auto',
        display: 'inline-block',
      }}
      ref={ref}
    />
  );
}
