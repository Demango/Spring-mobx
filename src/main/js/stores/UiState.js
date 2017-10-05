import { observable, action } from 'mobx';

export default class UiState {
    @observable showTasks = false;

    @action
    toggleTasks() {
        this.showTasks = !this.showTasks;
    }
}
