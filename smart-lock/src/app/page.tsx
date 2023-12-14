'use client';

import { useState } from 'react';

export default function Home() {
  const [locked, setLocked] = useState(true);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Smart Lock</h1>
      <button
        onClick={() => setLocked(!locked)}
        className="p-4 px-8 border-solid border-2 border-gray-700 rounded"
      >
        {(locked && 'Unlock') || 'Lock'}
      </button>
      Locked: {(locked && 'Yes') || 'No'}
    </main>
  );
}
