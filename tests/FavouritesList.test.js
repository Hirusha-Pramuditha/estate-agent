import { render, screen, fireEvent } from '@testing-library/react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import FavouritesList from '../src/components/FavouritesList'

const mockFavourites = [
  {
    id: 1,
    type: 'house',
    price: 450000,
    bedrooms: 4,
    location: 'Bromley',
    images: ['test1.jpg']
  },
  {
    id: 2,
    type: 'flat',
    price: 325000,
    bedrooms: 2,
    location: 'Westminster',
    images: ['test2.jpg']
  }
]

const renderWithDnd = (component) => {
  return render(
    <DndProvider backend={HTML5Backend}>
      {component}
    </DndProvider>
  )
}

describe('FavouritesList Component', () => {
  test('displays correct number of favourites', () => {
    const mockOnRemove = jest.fn()
    const mockOnClear = jest.fn()
    const mockOnView = jest.fn()
    const mockOnDrop = jest.fn()

    renderWithDnd(
      <FavouritesList
        favourites={mockFavourites}
        onRemove={mockOnRemove}
        onClear={mockOnClear}
        onView={mockOnView}
        onDrop={mockOnDrop}
      />
    )

    expect(screen.getByText('2')).toBeInTheDocument()
    expect(screen.getByText('£450,000')).toBeInTheDocument()
    expect(screen.getByText('£325,000')).toBeInTheDocument()
  })

  test('shows empty state when no favourites', () => {
    const mockOnRemove = jest.fn()
    const mockOnClear = jest.fn()
    const mockOnView = jest.fn()
    const mockOnDrop = jest.fn()

    renderWithDnd(
      <FavouritesList
        favourites={[]}
        onRemove={mockOnRemove}
        onClear={mockOnClear}
        onView={mockOnView}
        onDrop={mockOnDrop}
      />
    )

    expect(screen.getByText(/No favourites yet/)).toBeInTheDocument()
  })

  test('calls onRemove when Remove button is clicked', () => {
    const mockOnRemove = jest.fn()
    const mockOnClear = jest.fn()
    const mockOnView = jest.fn()
    const mockOnDrop = jest.fn()

    renderWithDnd(
      <FavouritesList
        favourites={mockFavourites}
        onRemove={mockOnRemove}
        onClear={mockOnClear}
        onView={mockOnView}
        onDrop={mockOnDrop}
      />
    )

    const removeButtons = screen.getAllByText('Remove')
    fireEvent.click(removeButtons[0])
    expect(mockOnRemove).toHaveBeenCalledWith(1)
  })

  test('calls onClear when Clear All button is clicked', () => {
    const mockOnRemove = jest.fn()
    const mockOnClear = jest.fn()
    const mockOnView = jest.fn()
    const mockOnDrop = jest.fn()

    // Mock window.confirm
    window.confirm = jest.fn(() => true)

    renderWithDnd(
      <FavouritesList
        favourites={mockFavourites}
        onRemove={mockOnRemove}
        onClear={mockOnClear}
        onView={mockOnView}
        onDrop={mockOnDrop}
      />
    )

    fireEvent.click(screen.getByText('Clear All'))
    expect(mockOnClear).toHaveBeenCalled()
  })
})