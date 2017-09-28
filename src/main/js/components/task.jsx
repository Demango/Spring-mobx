import { extendObservable, observable, action, runInAction } from 'mobx';
import { observer, Provider, inject } from 'mobx-react';
import React from 'react';
import { render } from 'react-dom';

@observer
export default class Task extends React.Component {
    render() {
        return (
            <li>{this.props.task.title}
                <ul>
                    <li>{this.props.task.description}</li>
                </ul>
            </li>
        )
    }
}
