import { Dispatch, createContext, useState } from 'react';

export interface ILockContext {
  password: string;
  isLocked: boolean;
  setIsLocked: Dispatch<React.SetStateAction<boolean>>;
  tempPassword: string;
  tempPasswordEnabled: boolean;
  setTempPasswordEnabled: Dispatch<React.SetStateAction<boolean>>;
}

export const LockContext = createContext<ILockContext>({} as ILockContext);
