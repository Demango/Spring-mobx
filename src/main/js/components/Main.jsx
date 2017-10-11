import { Provider } from 'mobx-react';
import React from 'react';
import { render } from 'react-dom';
import TaskList from 'components/TaskList';
import NewTaskForm from 'components/NewTaskForm';
import TaskState from 'stores/TaskState';
import UiState from 'stores/UiState';
import TaskFormState from 'stores/TaskFormState';

export default class Main extends React.Component {
    constructor() {
        super();

        this.rootStore = new RootStore();
    }

    render() {
        return (
            <Provider rootStore={this.rootStore}>
                <div>
                    <NewTaskForm />
                    <TaskList />
                </div>
            </Provider>
        )
    }
};

class RootStore {
    constructor() {
        this.taskStore = new TaskState();
        this.uiStore = new UiState();
        this.taskFormStore = new TaskFormState();
    }
}
