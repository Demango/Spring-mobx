import { observer } from 'mobx-react';
import React from 'react';
import { render } from 'react-dom';

var classNames = require('classnames');

@observer
export default class Task extends React.Component {
    constructor () {
        super()

        this.handleToggle = this.handleToggle.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleToggle() {
        this.props.onToggle(this.props.task);
    }

    handleDelete() {
        this.props.onDelete(this.props.task);
    }

    render() {
        var taskClasses = classNames(
            {
                'checked': this.props.task.checked
            }
        );
        var buttonClasses = classNames(
            'delete-button'
        );

        return (
            <li className={taskClasses}>
                <span onClick={this.handleToggle}>{this.props.task.title}</span>
                <button className={buttonClasses} onClick={this.handleDelete}>Delete</button>
                <ul>
                    <li>{this.props.task.description}</li>
                </ul>
            </li>
        )
    }
}
