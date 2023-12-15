import { Dispatch, createContext, useState } from 'react';

export interface ILockContext {
  isLocked: boolean;
  setIsLocked: Dispatch<React.SetStateAction<boolean>>;
}

export const LockContext = createContext<ILockContext>({} as ILockContext);
