import { Provider } from 'mobx-react';
import React from 'react';
import { render } from 'react-dom';
import TaskList from './components/tasklist';
import NewTaskForm from './components/newtaskform';
import TaskStore from './stores/taskstore';

const store = new TaskStore();

export default class Main extends React.Component {
    render() {
        return (
            <Provider taskStore={store}>
                <div>
                    <NewTaskForm />
                    <TaskList />
                </div>
            </Provider>
        )
    }
};
