import { render, screen } from '@testing-library/react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import App from '../src/App'

const renderWithDnd = (component) => {
  return render(
    <DndProvider backend={HTML5Backend}>
      {component}
    </DndProvider>
  )
}

describe('App Component', () => {
  test('renders main heading', () => {
    renderWithDnd(<App />)
    expect(screen.getByText('Premium Estate Agent')).toBeInTheDocument()
  })

  test('renders search form', () => {
    renderWithDnd(<App />)
    expect(screen.getByText('Search Properties')).toBeInTheDocument()
  })

  test('renders property listings section', () => {
    renderWithDnd(<App />)
    expect(screen.getByText('Property Listings')).toBeInTheDocument()
  })

  test('renders favourites section', () => {
    renderWithDnd(<App />)
    expect(screen.getByText('Favourites')).toBeInTheDocument()
  })

  test('displays properties from JSON data', () => {
    renderWithDnd(<App />)
    // Check that properties are rendered (should be 7 total)
    const viewButtons = screen.getAllByText('View Details')
    expect(viewButtons.length).toBeGreaterThan(0)
  })
})