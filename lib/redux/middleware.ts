/* Core */
import { createLogger } from 'redux-logger';
import { ProjectApiSlice } from './projectApi';
import { apiSlice } from './Api';

const middleware: any[] = [
  // createLogger({
  //   duration: true,
  //   timestamp: false,
  //   collapsed: true,
  //   colors: {
  //     title: () => '#139BFE',
  //     prevState: () => '#1C5FAF',
  //     action: () => '#149945',
  //     nextState: () => '#A47104',
  //     error: () => '#ff0005',
  //   },
  //   predicate: () => typeof window !== 'undefined',
  // }),
]

const allMiddleware = [ProjectApiSlice.middleware,apiSlice.middleware, ...middleware];

export { allMiddleware };

