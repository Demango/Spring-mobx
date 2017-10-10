import React from 'react';
import sinon from 'sinon';
import {expect} from 'chai';
import {when} from 'mobx';

import TaskState from 'stores/TaskState';

describe('TaskState', function () {
    let clientStub, store;

    beforeEach(function() {
        clientStub = sinon.stub();
        TaskState.__Rewire__('client', clientStub);
        const response = {entity:{_embedded:{tasks:[
            {id: 1, title: 'title', description: 'desc', checked: false}
        ]}}};
        clientStub.resolves(response);
    });

    it('should try to load an initial state', function (done) {
        store = new TaskState();

        sinon.assert.calledWith(clientStub, {method: 'GET', path: '/api/tasks'});
        when(() => store.tasks.length > 0, () => {
            try {
                expect(store.tasks.length).to.equal(1);
                done();
            } catch (e) {
                done(e);
            }
        });
    });

    it('should add a task', function (done) {
        store = new TaskState();

        let newTask = {title: 'new task title', description: 'new task desc', checked: false};
        let taskResponse = newTask;
        taskResponse.id = 2;
        store.addTask(newTask);

        sinon.assert.calledWith(clientStub, {
            method: 'POST',
            path: '/api/tasks',
            headers: {'Content-Type': 'application/json'},
            entity: taskResponse
        });
        when(() => store.tasks.length > 1, () => {
            try {
                expect(store.tasks.length).to.equal(2);
                done();
            } catch (e) {
                done(e);
            }
        });
    });

    it('should toggle a task', function (done) {
        store = new TaskState([{id: 1, title: 'title', description: 'desc', checked: false}]);

        when(() => store.tasks.length > 0, () => {
            try {
                const response = {entity: store.tasks[0]};
                response.entity.checked = true;
                clientStub.resolves(response);

                store.toggleTask(store.tasks[0]);

                sinon.assert.calledWith(clientStub, {
                    method: 'PATCH',
                    path: '/api/tasks/'+store.tasks[0].id,
                    headers: {'Content-Type': 'application/json'},
                    entity: {checked: !store.tasks[0].checked}
                });

                when(() => store.tasks[0].checked, () => {
                    done();
                });
            } catch (e) {
                done(e);
            }
        });
    });

    it('should remove a task', function (done) {
        store = new TaskState([{id: 1, title: 'title', description: 'desc', checked: false}]);

        when(() => store.tasks.length > 0, () => {
            try {
                const response = {entity: store.tasks[0]};
                response.entity.checked = true;
                clientStub.resolves(response);

                store.deleteTask(store.tasks[0]);

                sinon.assert.calledWith(clientStub, {
                    method: 'DELETE',
                    path: '/api/tasks/'+store.tasks[0].id
                });

                when(() => store.tasks.length == 0, () => {
                    done();
                });
            } catch (e) {
                done(e);
            }
        });
    });

    it('should compute total number of tasks', function (done) {
        store = new TaskState([{id: 1, title: 'title', description: 'desc', checked: false}]);

        when(() => store.tasks.length > 0, () => {
            try {
                expect(store.total).to.equal(1);
                done();
            } catch (e) {
                done(e);
            }
        });
    });

    it('should compute number of checked tasks', function (done) {
        store = new TaskState(
            [
                {id: 1, title: 'title', description: 'desc', checked: false},
                {id: 2, title: 'title', description: 'desc', checked: true}
            ]
        );

        when(() => store.tasks.length > 0, () => {
            try {
                expect(store.checkedCount).to.equal(1);
                done();
            } catch (e) {
                done(e);
            }
        });
    });
});
