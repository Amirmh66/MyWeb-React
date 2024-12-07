import { render, screen } from '@testing-library/react';
import "@testing-library/jest-dom"
import Dashboard from '../Dashboard.tsx';


test('renders UnitTest Text on Dashboard', () => {

    render(<Dashboard />)

    const textEl = screen.getByAltText(/UnitTest-test/i)
    expect(textEl).toBeInTheDocument();
});
