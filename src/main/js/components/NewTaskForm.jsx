import { observable, action } from 'mobx';
import { observer, inject } from 'mobx-react';
import React from 'react';
import { render } from 'react-dom';
import TaskFormState from 'stores/TaskFormState';

const taskFormState = new TaskFormState();

@inject('taskStore') @observer
export default class NewTaskForm extends React.Component {
    constructor () {
        super();

        this.onAdd = this.onAdd.bind(this);
    }

    onAdd() {
        this.props.taskStore.addTask(Object.assign({}, taskFormState.state));
        taskFormState.resetState();
    }

    render() {
        const task = taskFormState.state;
        return (
            <div>
                <h1>New task</h1>
                <input type="text" name="title" placeholder="title" value={task.title} onChange={taskFormState.onChange}/>
                <input type="text" name="description" placeholder="description" value={task.description} onChange={taskFormState.onChange}/>
                <button onClick={this.onAdd}>Add</button>
            </div>
        )
    }
}
