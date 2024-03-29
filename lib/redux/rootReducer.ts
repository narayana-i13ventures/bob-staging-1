import { BMCSlice } from "./BMCApi";
import { CVPSlice } from "./CVPApi";
import { chatSlice } from "./ChatApi";
import { commentSlice } from "./CommentApi";
import { thinkbeyondSlice } from "./ThinkbeyondApi";
import { ProjectApiSlice } from "./projectApi";
import { appSlice, pruchaseHistorySlice, teamSlice, userSlice } from "./slices";
import { selectedCardsSlice } from "./slices/SelectedSlice";

export const reducer = {
  commentApi: commentSlice.reducer,
  chatApi: chatSlice.reducer,
  ProjectApi: ProjectApiSlice.reducer,
  thinkbeyond: thinkbeyondSlice.reducer,
  BMC: BMCSlice.reducer,
  CVP: CVPSlice.reducer,
  App: appSlice.reducer,
  Team: teamSlice.reducer,
  user: userSlice.reducer,
  selectedCards: selectedCardsSlice.reducer,
  purchaseHistory: pruchaseHistorySlice.reducer,
};
