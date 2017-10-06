import React from 'react';
import { mount, shallow } from 'enzyme';
import {expect} from 'chai';

import UiState from 'stores/UiState';

describe('UiState', function () {
    it('should toggle showing tasks', function () {
        const store = new UiState();
        expect(store.showTasks).to.be.false;
        store.toggleTasks();
        expect(store.showTasks).to.be.true;
    });
});
