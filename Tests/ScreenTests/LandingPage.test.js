import renderer from 'react-test-renderer';
import React from 'react';
import LandingPage from '../../src/screens/LandingPage';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

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

describe("LandingPageTests", () => {
    test("Renders correctly", () => {
        const tree = renderer.create(<MockedNavigator component={LandingPage}/>);

        expect(tree.toJSON()).toMatchSnapshot();
    })
})