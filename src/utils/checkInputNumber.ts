import { ChangeEvent } from 'react';

import { REG } from './validation';

export const checkInputNumber = (e: ChangeEvent<HTMLInputElement>) => {
  const { value } = e.currentTarget;

  e.currentTarget.value = value.replace(REG.NOT_NUMBER, '');
};
