import renderer from 'react-test-renderer';
import React from 'react';
import MockDate from 'mockdate'
import FloatingButton from '../src/components/FloatingButton';
import LoadingAlertBox from '../src/components/LoadingAlertBox';

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

describe("FloatingButtonTests", () => {
    test("Renders correctly", async () => {
        const tree = renderer.create(
            <LoadingAlertBox text={jest.fn()} icon={jest.fn()} colors={jest.fn()} loading={jest.fn()} loadingText={jest.fn()} error={jest.fn()} errorIcon={jest.fn()} errorColors={jest.fn()} />
        ).toJSON(); 

        timeTravel(500);

        expect(tree).toMatchSnapshot();
    })
})