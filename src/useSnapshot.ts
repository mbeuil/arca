import * as React from 'react';

export function useSnapshot<TMemo>() {
  const snapshot = React.useRef<TMemo | null>(null);
  const getSnapshot = (newValue: TMemo) => {
    if (
      !snapshot.current ||
      JSON.stringify(newValue) !== JSON.stringify(snapshot.current)
    ) {
      snapshot.current = newValue;
      return newValue;
    }
    return snapshot.current;
  };

  return getSnapshot;
}
