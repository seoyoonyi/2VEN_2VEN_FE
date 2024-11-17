import { authHandlers } from '@/mocks/handlers/auth.handlers';
import { strategyHandlers } from '@/mocks/handlers/strategy.handlers';

export const handlers = [...authHandlers, ...strategyHandlers];
