import { render, cleanup} from '@testing-library/react'
import '@testing-library/jest-dom'
import Probability from '../pages/probability'
import {
  initialState, TargetOptions,
} from '../contexts';
import MockStateData from '../data/mockstatedata';
import MockFgoProvider from '../data/mockProvider';
import { StateType } from '../types/contexts';
import { useRef } from 'react';

jest.mock('next/future/image', () => ({
  __esModule: true,
  default: (props: any) => {
    return <img {...props} />
  },
}));

jest.mock("react-resize-detector", () => ({
  useResizeDetector: () => {return {width: 100, ref: useRef<HTMLDivElement>(null)}},
}));

const renderWithProvider = ({mockDispatch = jest.fn(), mockState = initialState} : { mockDispatch?: jest.Mock, mockState?: StateType}) => (
  render(
  <MockFgoProvider
    state={mockState}
    dispatch={mockDispatch}
    >
      <Probability />
  </MockFgoProvider>
  )
)

describe('Probability', () => {
  it('renders a total of the servant, its probability, and upcoming banners', () => {
    const sampleTargetData = {
      name: "Ereshkigal",
      rarity: 5,
      shared: 1,
      type: TargetOptions.servant
    };
    const targetMockState = {...MockStateData, totalSQForBanner: 1244, targetData: [sampleTargetData]}
    const { getByText} = renderWithProvider({mockState: targetMockState});
    expect(getByText("Ereshkigal")).toBeInTheDocument();
    expect(getByText("1,244")).toBeInTheDocument();
    expect(getByText("Fate/Grand Carnival 2nd Season Campaign: 2023/10/19")).toBeInTheDocument();
    cleanup();
  })
})