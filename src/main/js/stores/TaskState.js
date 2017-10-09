import { observable, action, computed, runInAction } from 'mobx';

import client from 'modules/client';

export default class TaskState {
    @observable tasks = [];
    @observable isLoading = false;

    constructor(tasks) {
        if (tasks) {
            runInAction(() => {
                this.tasks = tasks;
            });
        } else {
            this.loadTasks();
        }
    }

    @computed get checkedCount() {
        return this.tasks.filter(task => task.checked).length;
    }

    @computed get total() {
        return this.tasks.length;
    }

    @action
    loadTasks() {
        this.isLoading = true;
        client({method: 'GET', path: '/api/tasks'})
        .then(response => {
            runInAction(() => {
                this.tasks = response.entity._embedded.tasks;
                this.isLoading = false;
            });
        });
    }

    @action
    addTask(task) {
        this.isLoading = true;
        client({
            method: 'POST',
            path: '/api/tasks',
            headers: {'Content-Type': 'application/json'},
            entity: task
        })
        .then(response => {
            runInAction(() => {
                this.tasks.push(response.entity);
                this.isLoading = false;
            });
        });
    }

    @action
    toggleTask(task) {
        this.isLoading = true;
        client({
            method: 'PATCH',
            path: '/api/tasks/'+task.id,
            headers: {'Content-Type': 'application/json'},
            entity: {checked: !task.checked}
        })
        .then(response => {
            runInAction(() => {
                task.checked = response.entity.checked;
                this.isLoading = false;
            });
        });
    }

    @action
    deleteTask(task) {
        this.isLoading = true;
        client({
            method: 'DELETE',
            path: '/api/tasks/'+task.id
        })
        .then(response => {
            runInAction(() => {
                this.tasks.remove(task);
                this.isLoading = false;
            });
        });
    }
}
