import React from 'react';
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import FlatlistItem from '../../src/components/FlatlistItem';
import { create } from "react-test-renderer";
import { FlatList } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import renderer from 'react-test-renderer';
import Settings from '../../src/screens/Settings';
import GroceryList from '../../src/screens/GroceryList';

describe("GrocerList tests", () => {
    test("Renders correctly", () => {
        const tree = renderer.create(<GroceryList></GroceryList>);

        expect(tree.toJSON()).toMatchSnapshot();
    })
})