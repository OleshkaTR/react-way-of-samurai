import { render } from '@testing-library/react';
import React from "react";
import MainApp from "./App";

test('renders without crashing', () => {
  render(<MainApp />);
});
