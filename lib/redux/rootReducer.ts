import { apiSlice } from './Api'
import { ProjectApiSlice } from './projectApi'
import { appSlice, pruchaseHistorySlice, teamSlice, userSlice } from './slices'
import { selectedCards } from './slices/SelectedSlice'

export const reducer = {
  api: apiSlice.reducer,
  ProjectApi: ProjectApiSlice.reducer,
  App: appSlice.reducer,
  Team: teamSlice.reducer,
  user: userSlice.reducer,
  selectedCards: selectedCards.reducer,
  purchaseHistory: pruchaseHistorySlice.reducer,
}
