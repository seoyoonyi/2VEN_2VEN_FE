import { authHandlers } from '@/mocks/handlers/auth.handlers';
import { exampleHandlers } from '@/mocks/handlers/example.handlers';
import { strategyHandlers } from '@/mocks/handlers/strategy.handlers';

export const handlers = [...authHandlers, ...strategyHandlers, ...exampleHandlers];
