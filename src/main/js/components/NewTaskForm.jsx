import { observable, action } from 'mobx';
import { observer, inject } from 'mobx-react';
import React from 'react';
import { render } from 'react-dom';

const initialState = {
    title: '',
    description: '',
    checked: false
};

@inject('taskStore') @observer
export default class NewTaskForm extends React.Component {
    constructor () {
        super();

        this.updateProperty = this.updateProperty.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onAdd = this.onAdd.bind(this);

        this.state = Object.assign({}, initialState);
    }

    @observable state;

    @action
    updateProperty(key, value) {
        this.state[key] = value;
    }

    onChange(event) {
        this.updateProperty(event.target.name, event.target.value)
    }

    onAdd() {
        this.props.taskStore.addTask(Object.assign({}, this.state));
        this.resetState();
    }

    resetState() {
        for (var key in initialState) {
            this.updateProperty(key, initialState[key]);
        }
    }

    render() {
        const task = this.state;
        return (
            <div>
                <h1>New task</h1>
                <input type="text" name="title" placeholder="title" value={task.title} onChange={this.onChange}/>
                <input type="text" name="description" placeholder="description" value={task.description} onChange={this.onChange}/>
                <button onClick={this.onAdd}>Add</button>
            </div>
        )
    }
}
