import React from 'react';
import {expect} from 'chai';

import TaskFormState from 'stores/TaskFormState';

describe('TaskFormState', function () {
    let store = null;

    beforeEach(function() {
        store = new TaskFormState();
    });

    it('should have initial state', function () {
        expect(store.state.title).to.equal('');
        expect(store.state.description).to.equal('');
        expect(store.state.checked).to.be.false;
    });

    it('should handle change events', function () {
        expect(store.state.title).to.equal('');
        store.onChange({target: {
            name: 'title',
            value: 'new task title'
        }});
        expect(store.state.title).to.equal('new task title');
    });

    it('should clear current state', function () {
        store.onChange({target: {
            name: 'title',
            value: 'new task title'
        }});
        store.onChange({target: {
            name: 'description',
            value: 'new task description'
        }});
        store.onChange({target: {
            name: 'checked',
            value: true
        }});

        expect(store.state.title).to.equal('new task title');
        expect(store.state.description).to.equal('new task description');
        expect(store.state.checked).to.be.true;

        store.resetState();

        expect(store.state.title).to.equal('');
        expect(store.state.description).to.equal('');
        expect(store.state.checked).to.be.false;
    });
});
