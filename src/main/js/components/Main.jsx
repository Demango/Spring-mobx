import { Provider } from 'mobx-react';
import React from 'react';
import { render } from 'react-dom';
import TaskList from 'components/TaskList';
import NewTaskForm from 'components/NewTaskForm';
import TaskState from 'stores/TaskState';
import UiState from 'stores/UiState';

const taskState = new TaskState();
const uiState = new UiState();

export default class Main extends React.Component {
    render() {
        return (
            <Provider taskStore={taskState} uiStore={uiState}>
                <div>
                    <NewTaskForm />
                    <TaskList />
                </div>
            </Provider>
        )
    }
};
