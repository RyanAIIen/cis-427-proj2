'use client';

import { useState } from 'react';

import * as Switch from '@radix-ui/react-switch';

import { LockContext } from '@/components/LockContext';
import { MQTTConnection } from '@/components/MQTTConnection';

export default function Home() {
  const [isLocked, setIsLocked] = useState(true);

  return (
    <LockContext.Provider value={{ isLocked, setIsLocked }}>
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
            onClick={() => setIsLocked(!isLocked)}
            checked={isLocked}
          >
            <Switch.Thumb className="SwitchThumb" />
          </Switch.Root>
          <label
            className="Label"
            htmlFor="lock-status"
            style={{ display: 'block', cursor: 'pointer', userSelect: 'none' }}
          >
            {(isLocked && 'Locked') || 'Unlocked'}
          </label>
        </div>
        <div></div>
        <div></div>
      </main>
    </LockContext.Provider>
  );
}
