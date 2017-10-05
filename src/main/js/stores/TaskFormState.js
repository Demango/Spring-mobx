import { observable, action } from 'mobx';

const initialState = {
    title: '',
    description: '',
    checked: false
};

export default class taskFormState {
    @observable state = Object.assign({}, initialState);

    constructor() {
        this.updateProperty = this.updateProperty.bind(this);
        this.onChange = this.onChange.bind(this);
        this.resetState = this.resetState.bind(this);
    }

    @action
    updateProperty(key, value) {
        this.state[key] = value;
    }

    onChange(event) {
        this.updateProperty(event.target.name, event.target.value)
    }

    resetState() {
        for (var key in initialState) {
            this.updateProperty(key, initialState[key]);
        }
    }
}
