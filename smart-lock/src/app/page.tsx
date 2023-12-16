'use client';

import { useState } from 'react';

import * as Switch from '@radix-ui/react-switch';

import { LockedIcon, UnlockedIcon } from '@/components/icons';
import { LockContext } from '@/components/LockContext';
import { MQTTConnection } from '@/components/MQTTConnection';

const btnClass =
  'p-1 px-2 bg-gray-200 border border-solid border-gray-400 rounded text-xs';

export default function Home() {
  const password = 'YouShallNotPass';
  const [tempPassword, setTempPassword] = useState('temp1234');
  const [tempPasswordEnabled, setTempPasswordEnabled] = useState(false);
  const [isLocked, setIsLocked] = useState(true);

  const lockContext = {
    password,
    tempPassword,
    tempPasswordEnabled,
    setTempPasswordEnabled,
    isLocked,
    setIsLocked,
  };

  return (
    <LockContext.Provider value={lockContext}>
      <main className="min-h-screen items-center p-24 text-center">
        <MQTTConnection />
        <h1 className="text-2xl mb-20">Smart Lock</h1>

        <div className="text-center">
          <span>{isLocked ? <LockedIcon /> : <UnlockedIcon />}</span>
        </div>
        <Switch.Root
          className="SwitchRoot"
          id="lock-status"
          onClick={() => setIsLocked(!isLocked)}
          checked={isLocked}
        >
          <Switch.Thumb className="SwitchThumb" />
        </Switch.Root>

        <label
          className="Label text-xl"
          htmlFor="lock-status"
          style={{ display: 'block', cursor: 'pointer', userSelect: 'none' }}
        >
          {(isLocked && 'Locked') || 'Unlocked'}
        </label>

        <div className="text-base mt-10">
          <label htmlFor="tempPass" className="block">
            Temporary Password:
          </label>
          <input
            disabled={!tempPasswordEnabled}
            name="tempPass"
            className={`text-base p-1 px-2 text-center ${
              !tempPasswordEnabled && 'text-gray-300'
            }`}
            value={tempPassword}
            onChange={(event) => setTempPassword(event.target.value)}
          />
          <div className="text-xs text-gray-500 mt-1">
            {!tempPasswordEnabled && '(disabled)'}
          </div>
        </div>
      </main>
    </LockContext.Provider>
  );
}
