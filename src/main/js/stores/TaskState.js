import { observable, action, computed } from 'mobx';

import client from 'modules/client';

export default class TaskState {
    @observable tasks = [];

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
        client({method: 'GET', path: '/api/tasks'}).then(response => {
            this.tasks = response.entity._embedded.tasks;
        });
    }

    @action
    addTask(task) {
        client({
            method: 'POST',
            path: '/api/tasks',
            headers: {'Content-Type': 'application/json'},
            entity: task
        })
        .then(response => {
            this.tasks.push(response.entity);
        });
    }

    @action
    toggleTask(task) {
        client({
            method: 'PATCH',
            path: '/api/tasks/'+task.id,
            headers: {'Content-Type': 'application/json'},
            entity: {checked: !task.checked}
        })
        .then(response => {
            task.checked = response.entity.checked;
        });
    }

    @action
    deleteTask(task) {
        client({
            method: 'DELETE',
            path: '/api/tasks/'+task.id
        })
        .then(response => {
            this.tasks.remove(task);
        });
    }
}