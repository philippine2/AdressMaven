import React from 'react';
import ReactDOM from 'react-dom';
import Adapter from 'enzyme-adapter-react-16';
import { configure } from 'enzyme';
import AddressShow from '../source/AddressShow';
import { createShallow } from '@material-ui/core/test-utils';
import { Grid } from '@material-ui/core';
import { testData } from './test-data';
import { setLocalStorage } from '../source/assets/address-local-storage';
import { clearLocalStorage } from '../source/assets/elf-local-storage';

configure({ adapter: new Adapter() });

const debug =
    process.env.REACT_APP_ELF_LOGGER === 'sanity-address-show'
        ? console.log
        : () => {};

describe('Sanity AddressShow Layout Tests', () => {
    let wrapper = null;
    let shallow;

    beforeEach(() => {
        setLocalStorage(testData);
        shallow = createShallow();
        wrapper = shallow(<AddressShow />).dive();
    });

    afterEach(() => {
        wrapper = null;
        clearLocalStorage();
    });

    it('proves we can run a test', () => {
        expect(true).toBe(true);
    });

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<AddressShow />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('checks that GetRepos is a function', () => {
        expect(typeof AddressShow).toBe('function');
    });

    it('checks that we use className layout in second item', () => {
        expect(
            wrapper
                .find('div')
                .get(0)
                .props.className.includes('layout')
        ).toBe(true);
    });

    it('checks that the first Grid has a spacing of 24', () => {
        debug(wrapper.find(Grid).get(0).props.spacing);
        expect(wrapper.find(Grid).get(0).props.spacing).toBe(24);
    });

    it('checks that the second Grid has xs=12', () => {
        debug(wrapper.find(Grid).get(1).props.xs);
        expect(wrapper.find(Grid).get(1).props.xs).toBe(12);
    });
});
