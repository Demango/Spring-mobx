import { observer, inject } from 'mobx-react';
import React from 'react';
import { render } from 'react-dom';
import Task from './task'

@inject('taskStore', 'uiStore') @observer
export default class TaskList extends React.Component {
    constructor (props) {
        super(props)

        this.handleToggle = this.handleToggle.bind(this);
        this.onToggleTask = this.onToggleTask.bind(this);
        this.onDeleteTask = this.onDeleteTask.bind(this);
    }

    handleToggle() {
        this.props.uiStore.showTasks = !this.props.uiStore.showTasks;
    }

    onToggleTask(task) {
        this.props.taskStore.toggleTask(task);
    }

    onDeleteTask(task) {
        this.props.taskStore.deleteTask(task);
    }

    render() {
        const taskItems = this.props.taskStore.tasks.map((task) =>
          <Task onToggle={this.onToggleTask} key={task.id} onDelete={this.onDeleteTask} task={task} />
        );
        const toggler = (
            <button onClick={this.handleToggle}>
                {this.props.uiStore.showTasks?
                    'hide' :
                    'show'
                }
            </button>
        );
        const taskHeader = (
            <div>
                <h2>Current tasks ({this.props.taskStore.completedCount}/{this.props.taskStore.total} done) {toggler}</h2>
            </div>
        );

        return (
            <div>
                {taskHeader}
                <ul>
                    {this.props.uiStore.showTasks && taskItems}
                </ul>
            </div>
        )
    }
}
