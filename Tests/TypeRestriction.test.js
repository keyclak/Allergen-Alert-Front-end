import renderer from 'react-test-renderer';
import React from 'react';
import MockDate from 'mockdate'
import TypeRestriction from '../src/screens/TypeRestriction.js';

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
    MaterialIcons: 'Icon'
}));

beforeEach(setupTimeTravel);

const navigation = {
    addListener: jest.fn()
}

describe("TypeRestrictionPageTests", () => {
    test("Renders correctly", async () => {
        const tree = renderer.create(
            <TypeRestriction navigation={navigation}/>
        ).toJSON(); 

        timeTravel(500);

        expect(tree).toMatchSnapshot();
    })
})