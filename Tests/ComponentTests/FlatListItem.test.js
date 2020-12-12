import React from 'react';
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import FlatlistItem from '../../src/components/FlatlistItem';
import { create } from "react-test-renderer";
import { FlatList } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import renderer from 'react-test-renderer';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../../src/screens/auth/Login';
import GroceryList from '../../src/screens/GroceryList';

const Stack = createStackNavigator();
const MockedNavigator = ({component, params = {}}) => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="MockedScreen"
          component={component}
          params={params}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

describe("FlatListItem Tests", () => {
    test("Renders correctly", () => {
        const props = { i:1, item:{icon: "icon1", title: "title1", navTo:{Login}}};

        const tree = renderer.create(<MockedNavigator component={FlatlistItem}></MockedNavigator>);

        expect(tree.toJSON()).toMatchSnapshot();
    });

    // test("Correctly passes item in", () => {
    //     const item = { icon: "icon1", title: "title1" };

    //     const tree = renderer.create(
    //     <MockedNavigator component={Login}>
    //         <FlatlistItem item={item}/>
    //     </MockedNavigator>);

    //     expect(tree.toJSON().props.item.title).toEqual("title1");
    //     expect(tree.toJSON().props.item.icon).toEqual("icon1");
    // });

    it("accepts products props", () => {
        const props = {i:'1', item:{ icon: "icon1", title: "title1", navTo:{Login}}};

        const wrapper = mount(<FlatlistItem i={props.i} item={props.item}/>);
        expect(wrapper.props().item).toEqual(item);
      });
});