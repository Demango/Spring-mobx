import { Provider } from 'mobx-react';
import React from 'react';
import { render } from 'react-dom';
import TaskList from 'components/tasklist';
import NewTaskForm from 'components/newtaskform';
import TaskStore from 'stores/taskstore';
import UiStore from 'stores/uistore';

const tasks = new TaskStore();
const ui = new UiStore();

export default class Main extends React.Component {
    render() {
        return (
            <Provider taskStore={tasks} uiStore={ui}>
                <div>
                    <NewTaskForm />
                    <TaskList />
                </div>
            </Provider>
        )
    }
};
