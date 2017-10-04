import { observer, inject } from 'mobx-react';
import React from 'react';
import { render } from 'react-dom';
import Task from './task'

export default class TaskList extends React.Component {
    render() {
        return (
            <div>
                <TaskHeader />
                <ul>
                    <TaskItems />
                </ul>
            </div>
        )
    }
}

@inject('taskStore', 'uiStore') @observer
class TaskHeader extends React.Component {
    constructor (props) {
        super(props);

        this.handleToggle = this.handleToggle.bind(this);
    }

    handleToggle() {
        this.props.uiStore.showTasks = !this.props.uiStore.showTasks;
    }

    render() {
        const toggler = (
            <button onClick={this.handleToggle}>
                {this.props.uiStore.showTasks?
                    'hide' :
                    'show'
                }
            </button>
        );
        return (
            <div>
                <h2>Current tasks ({this.props.taskStore.completedCount}/{this.props.taskStore.total} done) {toggler}</h2>
            </div>
        );
    }
}

@inject('taskStore', 'uiStore') @observer
class TaskItems extends React.Component {
    constructor (props) {
        super(props);

        this.onToggleTask = this.onToggleTask.bind(this);
        this.onDeleteTask = this.onDeleteTask.bind(this);
    }

    onToggleTask(task) {
        this.props.taskStore.toggleTask(task);
    }

    onDeleteTask(task) {
        this.props.taskStore.deleteTask(task);
    }

    render() {
        if (this.props.uiStore.showTasks) {
            const tasks = this.props.taskStore.tasks.map((task) =>
                <Task onToggle={this.onToggleTask} key={task.id} onDelete={this.onDeleteTask} task={task} />
            );

            return (
                <div>
                    {tasks}
                </div>
            );
        }

        return null;
    }
}
