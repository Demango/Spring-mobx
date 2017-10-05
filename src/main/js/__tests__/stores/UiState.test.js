import UiState from "stores/UiState";

describe("UiState", () => {
  it("toggles the showing of the todo list", () => {
    const store = new UiState
    expect(store.showTasks).toBe(false);
    store.toggleTasks();
    expect(store.showTasks).toBe(true);
  })
});
