import { observable, action } from 'mobx';

const client = require('./../scripts/client');

export default class TaskStore {
    @observable tasks = [];

    constructor(transportLayer, authorStore) {
        this.loadTasks();
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
}
