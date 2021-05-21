import { render, act, waitFor } from '@testing-library/react';
import App from './App';

describe('APP tests', () => {
  test('Should render Top Stories', () => {
    render(<App />);
    const appElement = document.querySelector('#app');
    expect(appElement).toBeInTheDocument();
  });
});

