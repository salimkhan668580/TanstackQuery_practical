import { render, screen } from '@testing-library/react'
import Home from './src/Home'


test('renders heading', () => {
  render(<Home />)

expect(screen.getByText(/Latitude:/i, { exact: false })).toBeInTheDocument()
expect(screen.getByText(/Longitude:/i, { exact: false })).toBeInTheDocument()

})