import type { ReduxState } from '@/lib/redux'

export const selectPurchaseHistory = (state: ReduxState) => state.purchaseHistory;