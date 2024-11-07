import { authHandlers } from '@/mocks/handlers/auth.handlers';
import { strategyHandlers } from '@/mocks/handlers/strategy.handlers';
import { userHandlers } from '@/mocks/handlers/user.handlers';

export const handlers = [...authHandlers, ...userHandlers, ...strategyHandlers];
