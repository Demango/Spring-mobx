import { extendObservable, observable, action, runInAction } from 'mobx';
import { observer, Provider, inject } from 'mobx-react';
import React from 'react';
import { render } from 'react-dom';
import Task from './task'

@inject('taskStore') @observer
export default class TaskList extends React.Component {
    constructor (props) {
        super(props)

        this.onToggle = this.onToggle.bind(this);
    }

    onToggle(task) {
        this.props.taskStore.toggleTask(task);
    }

    render() {
        const taskItems = this.props.taskStore.tasks.map((task) =>
          <Task onToggle={this.onToggle} key={task.id} task={task} />
        );

        return (
            <div>
                <h2>Current tasks</h2>
                <ul>
                    {taskItems}
                </ul>
            </div>
        )
    }
}
