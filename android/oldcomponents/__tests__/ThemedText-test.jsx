import React from 'react';
import { render } from '@testing-library/react';
import ThemedText from './ThemedText';  // Assuming you have this component

test('renders correctly', () => {
  const { asFragment } = render(<ThemedText>Snapshot test!</ThemedText>);
  expect(asFragment()).toMatchSnapshot();
});
