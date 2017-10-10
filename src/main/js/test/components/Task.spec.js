import React from 'react';
import sinon from 'sinon';
import { use, expect } from 'chai';
let sinonChai = require("sinon-chai");
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

use(sinonChai);
configure({ adapter: new Adapter() });

import Task from 'components/Task';

describe('Task', function () {
    let props, wrapper;

    beforeEach(function() {
        props = {
            task: {
                title: 'add a new task',
                description: 'make sure it has a description',
                checked: true
            },
            onToggle: sinon.spy(),
            onDelete: sinon.spy()
        };
        wrapper = shallow(<Task {...props} />);
    });

    it('should render a passed task', function () {
        expect(wrapper.find('span').text()).to.equal(props.task.title);
        expect(wrapper.find('ul li').text()).to.equal(props.task.description);
        expect(wrapper.find('li').at(0).hasClass('checked')).to.be.true;
    });

    it('should toggle a task', function() {
        wrapper.find('span').simulate('click');
        expect(props.onToggle).to.have.been.called;
    });

    it('should delete a task', function() {
        wrapper.find('button.delete-button').simulate('click');
        expect(props.onDelete).to.have.been.called;
    });
});
