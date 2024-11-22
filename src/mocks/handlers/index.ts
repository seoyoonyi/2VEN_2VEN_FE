import {
  checkNicknameHandler,
  signinHandler,
  findEmailHandler,
} from '@/mocks/handlers/auth.handlers';
import { exampleHandlers } from '@/mocks/handlers/example.handlers';
import { strategyHandlers } from '@/mocks/handlers/strategy.handlers';
import { strategyDetailHandlers } from '@/mocks/handlers/strategyDetail.handlers';

export const handlers = [
  ...signinHandler,
  ...strategyHandlers,
  ...exampleHandlers,
  ...strategyDetailHandlers,
  ...checkNicknameHandler,
  ...findEmailHandler,
];
