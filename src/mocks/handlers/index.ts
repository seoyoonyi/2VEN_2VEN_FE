import { signinHandler } from '@/mocks/handlers/auth.handlers';
import { exampleHandlers } from '@/mocks/handlers/example.handlers';
import { strategyHandlers } from '@/mocks/handlers/strategy.handlers';

export const handlers = [...signinHandler, ...strategyHandlers, ...exampleHandlers];
