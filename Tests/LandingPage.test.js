import renderer from 'react-test-renderer';
import React from 'react';
import MockDate from 'mockdate';
import LandingPage from '../src/screens/LandingPage.js';
import FlatlistItem from '../src/components/FlatlistItem.js';

const FRAME_TIME = 10

const advanceOneFrame = () => {
  const now = Date.now();
  MockDate.set(new Date(now + FRAME_TIME));
  jest.advanceTimersByTime(FRAME_TIME);
}

const timeTravel = (msToAdvance = FRAME_TIME) => {
  const numberOfFramesToRun = msToAdvance / FRAME_TIME;
  let framesElapsed = 0;

  while (framesElapsed < numberOfFramesToRun) {
    advanceOneFrame();
    framesElapsed++;
  }
}
global.requestAnimationFrame = cb => {
  setTimeout(cb, FRAME_TIME);
}

export const setupTimeTravel = () => {
    MockDate.set(0);
    jest.useFakeTimers();
}

jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');
jest.mock('@expo/vector-icons', () => ({
    MaterialIcons: 'Icon',
    IconFlatList: 'FlatList'
}));

const navigation = {
  addListener: jest.fn()
}

jest.mock('../src/components/FlatlistItem.js', () => () => 'ListItem')

beforeEach(setupTimeTravel);

describe("LandingPageTests", () => {
    test("Renders correctly", async () => {
        const tree = renderer.create(
            <LandingPage navigation={navigation}/>
        ).toJSON(); 

        timeTravel(500);

        expect(tree).toMatchSnapshot();
    })
})