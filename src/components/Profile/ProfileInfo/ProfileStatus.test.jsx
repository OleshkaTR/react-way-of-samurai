import React from "react";
import { create } from 'react-test-renderer';
import ProfileStatus from "./ProfileStatus";

describe('Profile status component', () => {
    test('status from props should be in the state', () => {
        const component = create(<ProfileStatus status='it-kamasutra'/>);
        const instance = component.getInstance();
        expect(instance.state.status).toBe('it-kamasutra');
    });

    test('after creation, <p> with should be displayed with correct status', () => {
        const component = create(<ProfileStatus status='it-kamasutra'/>);
        const root = component.root;
        let p = root.findByType('p');
        expect(p).not.toBeNull();
    });

    test('after creation, <p> should`t be displayed', () => {
        const component = create(<ProfileStatus status='it-kamasutra'/>);
        const root = component.root;
        expect(() => {
            let input = root.findByType('input');
        }).toThrow();
    });

    test('after creation, <p> should be contains correct status', () => {
        const component = create(<ProfileStatus status='it-kamasutra'/>);
        const root = component.root;
        let p = root.findByType('p');
        expect(p.children[0]).toBe('it-kamasutra');
    });

    test('<input> should be displayed in editMode instead <p>', () => {
        const component = create(<ProfileStatus status='it-kamasutra'/>);
        const root = component.root;
        let p = root.findByType('p');
        p.props.onDoubleClick();
        let input = root.findByType('input')
        expect(input.props.value).toBe('it-kamasutra');
    });
});
