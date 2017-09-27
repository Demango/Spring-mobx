import { extendObservable, observable } from 'mobx';
import { observer, Provider, inject } from 'mobx-react';
import React from 'react';
import { render } from 'react-dom';

const client = require('./client');

const store = observable({
    tasks: []
});

export default class Main extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        client({method: 'GET', path: '/api/tasks'}).then(response => {
            store.tasks = response.entity._embedded.tasks;
        });
    }

    render() {
        return (
            <Provider taskStore={store}>
                <TaskList />
            </Provider>
        )
    }
};

const TaskList = inject('taskStore')(observer(class TaskList extends React.Component {
    render() {
        const taskItems = this.props.taskStore.tasks.map((task) =>
          <Task key={task._links.self.href} task={task} />
        );
        return (
            <ul>
                {taskItems}
            </ul>
        )
    }
}));

function Task(props) {
    return (
        <li>{props.task.title}
            <ul>
                <li>{props.task.description}</li>
            </ul>
        </li>
    );
}
