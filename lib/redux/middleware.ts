/* Core */
import { createLogger } from "redux-logger";
import { ProjectApiSlice } from "./projectApi";
import { thinkbeyondSlice } from "./ThinkbeyondApi";
import { BMCSlice } from "./BMCApi";
import { chatSlice } from "./ChatApi";
import { commentSlice } from "./CommentApi";
import { CVPSlice } from "./CVPApi";

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
];

const allMiddleware = [
  CVPSlice.middleware,
  commentSlice.middleware,
  chatSlice.middleware,
  ProjectApiSlice.middleware,
  thinkbeyondSlice.middleware,
  BMCSlice.middleware,
  ...middleware,
];

export { allMiddleware };
