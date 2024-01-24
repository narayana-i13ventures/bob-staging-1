import type { ReduxState } from "@/lib/redux";


export const selectedThinkbeyond = (state: ReduxState) => state?.selectedCards?.ThinkBeyondSelectedCard;
export const selectedFuture1BMCCard = (state: ReduxState) => state?.selectedCards?.Future1BMCSelected;
export const selectedFuture2BMCCard = (state: ReduxState) => state?.selectedCards?.Future2BMCSelected;
export const selectedFuture3BMCCard = (state: ReduxState) => state?.selectedCards?.Future3BMCSelected;
export const selectedFuture1CVPCard = (state: ReduxState) => state?.selectedCards?.Future1CVPSelected;
export const selectedFuture2CVPCard = (state: ReduxState) => state?.selectedCards?.Future2CVPSelected;
export const selectedFuture3CVPCard = (state: ReduxState) => state?.selectedCards?.Future3CVPSelected;