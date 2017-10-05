import { observable, action, computed, runInAction } from 'mobx';

import client from 'modules/client';

export default class TaskState {
    @observable tasks = [];
    @observable state = 'done';

    constructor() {
        this.loadTasks();
    }

    @computed get completedCount() {
        return this.tasks.filter(task => task.checked).length;
    }

    @computed get total() {
        return this.tasks.length;
    }

    @action
    loadTasks() {
        this.state = 'pending';
        client({method: 'GET', path: '/api/tasks'}).then(response => {
            runInAction(() => {
                this.tasks = response.entity._embedded.tasks;
                this.state = 'done';
            });
        });
    }

    @action
    addTask(task) {
        this.state = 'pending';
        client({
            method: 'POST',
            path: '/api/tasks',
            headers: {'Content-Type': 'application/json'},
            entity: task
        })
        .then(response => {
            runInAction(() => {
                this.tasks.push(response.entity);
                this.state = 'done';
            });
        });
    }

    @action
    toggleTask(task) {
        this.state = 'pending';
        client({
            method: 'PATCH',
            path: '/api/tasks/'+task.id,
            headers: {'Content-Type': 'application/json'},
            entity: {checked: !task.checked}
        })
        .then(response => {
            runInAction(() => {
                task.checked = response.entity.checked;
                this.state = 'done';
            });
        });
    }

    @action
    deleteTask(task) {
        this.state = 'pending';
        client({
            method: 'DELETE',
            path: '/api/tasks/'+task.id
        })
        .then(response => {
            runInAction(() => {
                this.tasks.remove(task);
                this.state = 'done';
            });
        });
    }
}
