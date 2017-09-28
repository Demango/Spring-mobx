import { extendObservable, observable, action, runInAction } from 'mobx';
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
        runInAction(() => {
            client({method: 'GET', path: '/api/tasks'}).then(response => {
                store.tasks = response.entity._embedded.tasks;
            });
        })
    }

    render() {
        return (
            <Provider taskStore={store}>
                <div>
                    <TaskList />
                    <NewTaskForm />
                </div>
            </Provider>
        )
    }
};

const TaskList = inject('taskStore')(observer(class TaskList extends React.Component {
    render() {
        const taskItems = this.props.taskStore.tasks.map((task) =>
          <Task key={task.id} task={task} />
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

const NewTaskForm = inject('taskStore')(observer(class NewTaskForm extends React.Component {
    constructor (props) {
        super(props)
        this.updateProperty = this.updateProperty.bind(this)
        this.onChange = this.onChange.bind(this)
        this.onAdd = action(this.onAdd.bind(this))

        this.state = observable({
            title: '',
            description: '',
            checked: false
        })
    }

    updateProperty(key, value) {
        this.state[key] = value
    }

    onChange(event) {
        this.updateProperty(event.target.name, event.target.value)
    }

    onAdd() {
        runInAction(() => {
            client({
                method: 'POST',
                path: '/api/tasks',
                headers: {'Content-Type': 'application/json'},
                entity: this.state
            })
            .then(response => {
                this.props.taskStore.tasks.push(response.entity);
            });
        });
    }

    render() {
        const task = this.state
        return (
            <div>
                <h1>New task</h1>
                <input type="text" name="title" placeholder="title" value={task.title} onChange={this.onChange}/>
                <input type="text" name="description" placeholder="description" value={task.description} onChange={this.onChange}/>
                <button onClick={this.onAdd}>Add</button>
            </div>
        )
    }
}));
