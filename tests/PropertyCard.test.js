import { render, screen, fireEvent } from '@testing-library/react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import PropertyCard from '../src/components/PropertyCard'

const mockProperty = {
  id: 1,
  type: 'house',
  price: 450000,
  bedrooms: 4,
  bathrooms: 3,
  location: 'Bromley',
  shortDescription: 'Beautiful house',
  images: ['test-image.jpg']
}

const renderWithDnd = (component) => {
  return render(
    <DndProvider backend={HTML5Backend}>
      {component}
    </DndProvider>
  )
}

describe('PropertyCard Component', () => {
  test('renders property information correctly', () => {
    const mockOnView = jest.fn()
    const mockOnAddToFavourites = jest.fn()

    renderWithDnd(
      <PropertyCard
        property={mockProperty}
        onView={mockOnView}
        onAddToFavourites={mockOnAddToFavourites}
        isFavourite={false}
      />
    )

    expect(screen.getByText('£450,000')).toBeInTheDocument()
    expect(screen.getByText('📍 Bromley')).toBeInTheDocument()
    expect(screen.getByText(/4 beds/)).toBeInTheDocument()
  })

  test('calls onView when View Details button is clicked', () => {
    const mockOnView = jest.fn()
    const mockOnAddToFavourites = jest.fn()

    renderWithDnd(
      <PropertyCard
        property={mockProperty}
        onView={mockOnView}
        onAddToFavourites={mockOnAddToFavourites}
        isFavourite={false}
      />
    )

    fireEvent.click(screen.getByText('View Details'))
    expect(mockOnView).toHaveBeenCalledWith(mockProperty)
  })

  test('calls onAddToFavourites when Save button is clicked', () => {
    const mockOnView = jest.fn()
    const mockOnAddToFavourites = jest.fn()

    renderWithDnd(
      <PropertyCard
        property={mockProperty}
        onView={mockOnView}
        onAddToFavourites={mockOnAddToFavourites}
        isFavourite={false}
      />
    )

    fireEvent.click(screen.getByText('🤍 Save'))
    expect(mockOnAddToFavourites).toHaveBeenCalledWith(mockProperty)
  })

  test('disables Save button when property is already a favourite', () => {
    const mockOnView = jest.fn()
    const mockOnAddToFavourites = jest.fn()

    renderWithDnd(
      <PropertyCard
        property={mockProperty}
        onView={mockOnView}
        onAddToFavourites={mockOnAddToFavourites}
        isFavourite={true}
      />
    )

    const saveButton = screen.getByText('❤️ Saved')
    expect(saveButton).toBeDisabled()
  })
})