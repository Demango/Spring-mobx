import { observable, action, runInAction } from 'mobx';
import { observer, Provider, inject } from 'mobx-react';
import React from 'react';
import { render } from 'react-dom';

@inject('taskStore') @observer
export default class NewTaskForm extends React.Component {
    constructor (props) {
        super(props)

        this.updateProperty = this.updateProperty.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onAdd = this.onAdd.bind(this);
    }

    @observable state = {
        title: '',
        description: '',
        checked: false
    };

    updateProperty(key, value) {
        this.state[key] = value
    }

    onChange(event) {
        this.updateProperty(event.target.name, event.target.value)
    }

    onAdd() {
        this.props.taskStore.addTask(this.state);
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
}
