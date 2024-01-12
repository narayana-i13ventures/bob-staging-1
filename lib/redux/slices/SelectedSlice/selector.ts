import type { ReduxState } from "@/lib/redux";


export const selectedThinkbeyond = (state: ReduxState) => state?.selectedCards?.ThinkBeyondSelectedCard;
export const selectedFuture1BMCCard = (state: ReduxState) => state?.selectedCards?.Future1BMCSelected;