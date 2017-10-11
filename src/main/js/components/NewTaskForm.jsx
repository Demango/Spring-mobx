import { observable, action } from 'mobx';
import { observer, inject } from 'mobx-react';
import React from 'react';
import { render } from 'react-dom';

@inject('rootStore') @observer
export default class NewTaskForm extends React.Component {
    constructor (props) {
        super(props);

        this.taskFormStore = props.rootStore.taskFormStore;
        this.taskStore = props.rootStore.taskStore;

        this.onAdd = this.onAdd.bind(this);
    }

    onAdd() {
        this.taskStore.addTask(Object.assign({}, this.taskFormStore.state));
        this.taskFormStore.resetState();
    }

    render() {
        const task = this.taskFormStore.state;
        return (
            <div>
                <h1>New task</h1>
                <input type="text" name="title" placeholder="title" value={task.title} onChange={this.taskFormStore.onChange}/>
                <input type="text" name="description" placeholder="description" value={task.description} onChange={this.taskFormStore.onChange}/>
                <button onClick={this.onAdd}>Add</button>
            </div>
        )
    }
}
