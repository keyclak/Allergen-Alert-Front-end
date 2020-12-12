import React from 'react';
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import FlatlistItem from '../../src/components/FlatlistItem';
import { create } from "react-test-renderer";
import { FlatList } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import renderer from 'react-test-renderer';
import Settings from '../../src/screens/Settings';

describe("Settings Tests", () => {
    test("Renders Correctly", () => {
        const tree = renderer.create(<Settings></Settings>);
        expect(tree.toJSON()).toMatchSnapshot();
    });
});