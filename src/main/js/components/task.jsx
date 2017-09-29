import { extendObservable, observable, action, runInAction } from 'mobx';
import { observer, Provider, inject } from 'mobx-react';
import React from 'react';
import { render } from 'react-dom';

var classNames = require('classnames');

@observer
export default class Task extends React.Component {
    render() {
        var taskClasses = classNames(
            {
                'checked': this.props.task.checked
            }
        );

        return (
            <li className={taskClasses} onClick={() => this.props.onToggle(this.props.task)}>{this.props.task.title}
                <ul>
                    <li>{this.props.task.description}</li>
                </ul>
            </li>
        )
    }
}
