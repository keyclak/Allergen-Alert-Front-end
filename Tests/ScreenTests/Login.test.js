import React from 'react';
import renderer from 'react-test-renderer';
import Login from '../../src/screens/auth/Login';
import MockDate from 'mockdate';

// jest.mock('react-native-reanimated', () => {
//   const Reanimated = require('react-native-reanimated/mock');

//   // The mock for `call` immediately calls the callback which is incorrect
//   // So we override it with a no-op
//   Reanimated.default.call = () => {};

//   return Reanimated;
// });

// // Silence the warning: Animated: `useNativeDriver` is not supported because the native animated module is missing
// jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');

// jest.mock('../../src/context', () => {
//     return {AuthContext: jest.fn(() => ({
//        logIn: () => {},
//        logOut: () => {}
//     }))}
// })

jest.enableAutomock();
jest.genMockFromModule('../../src/context.js');

const FRAME_TIME = 10;

const setupTimeTravel = () => {
  MockDate.set(0)
  jest.useFakeTimers()
}

global.requestAnimationFrame = cb => {
  setTimeout(cb, FRAME_TIME)
}

const advanceOneFrame = () => {
  const now = Date.now()
  MockDate.set(new Date(now + FRAME_TIME))
  jest.advanceTimersByTime(FRAME_TIME)
}

const timeTravel = (msToAdvance = FRAME_TIME) => {
  const numberOfFramesToRun = msToAdvance / FRAME_TIME
  let framesElapsed = 0

  // Step through each of the frames until we've ran them all
  while (framesElapsed < numberOfFramesToRun) {
    advanceOneFrame()
    framesElapsed++
  }
}

beforeEach(setupTimeTravel)

// const Stack = createStackNavigator();
// const MockedNavigator = ({component, params = {}}) => {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         <Stack.Screen
//           name="MockedScreen"
//           component={component}
//           params={params}
//         />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };

// beforeEach(() => {
//   jest.useFakeTimers();
// });

jest.useFakeTimers();

describe("Login Tests", () => {
    test("Renders correctly", async () => {
        const tree = renderer.create(<Login />).toJSON();

        timeTravel(2000)

        expect(tree).toMatchSnapshot();
    });
});