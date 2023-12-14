'use client';

import { useState } from 'react';

import * as Switch from '@radix-ui/react-switch';

import { MQTTConnection } from '@/components/MQTTConnection';

export default function Home() {
  const [locked, setLocked] = useState(true);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 style={{ fontSize: '.5em' }}>Smart Lock</h1>

      <MQTTConnection />

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Switch.Root
          className="SwitchRoot"
          id="lock-status"
          onClick={() => setLocked(!locked)}
          checked={locked}
        >
          <Switch.Thumb className="SwitchThumb" />
        </Switch.Root>
        <label
          className="Label"
          htmlFor="lock-status"
          style={{ display: 'block', cursor: 'pointer', userSelect: 'none' }}
        >
          {(locked && 'Locked') || 'Unlocked'}
        </label>
      </div>
      <div></div>
      <div></div>
    </main>
  );
}
