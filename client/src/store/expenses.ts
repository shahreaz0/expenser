import { createStore } from "stan-js";

export const { useStore: useExpenseStore } = createStore({
  isExpensesDialogOpen: false,
});
