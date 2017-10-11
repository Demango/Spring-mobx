import React from 'react';
import sinon from 'sinon';
import { use, expect } from 'chai';
let sinonChai = require("sinon-chai");
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

use(sinonChai);
configure({ adapter: new Adapter() });

import NewTaskForm from 'components/NewTaskForm';

describe('NewTaskForm', function () {
    let storeStub, props, wrapper;

    beforeEach(function() {
        storeStub = {
            state: {
                title: 'add a new task',
                description: 'describe it well'
            },
            resetState: sinon.spy(),
            onChange: sinon.spy()
        };

        props = {
            rootStore: {
                taskFormStore: storeStub,
                taskStore: {
                    addTask: sinon.spy()
                }
            }
        };
        wrapper = mount(<NewTaskForm {...props} />);
    });

    it('should render field state', function () {
        expect(wrapper.find('input').at(0).props().value).to.equal(storeStub.state.title);
        expect(wrapper.find('input').at(1).props().value).to.equal(storeStub.state.description);
    });

    it('should handle fields being changed', function () {
        wrapper.find('input').at(0).simulate('change');
        expect(storeStub.onChange).to.have.been.called;
    });

    it('should add a new task', function () {
        wrapper.find('button').simulate('click');
        expect(props.rootStore.taskStore.addTask).to.have.been.called;
        expect(storeStub.resetState).to.have.been.called;
    });
});
