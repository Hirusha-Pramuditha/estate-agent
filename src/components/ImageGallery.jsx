import { useState } from 'react'
import ImageGallery from 'react-image-gallery'
import 'react-image-gallery/styles/css/image-gallery.css'

/**
 * PropertyImageGallery Component
 * Displays property images in an interactive gallery
 * @param {Array} images - Array of image URLs
 * @param {string} location - Property location for alt text
 */
function PropertyImageGallery({ images, location }) {
  // Transform images array to gallery format
  const galleryImages = images.map((image, index) => ({
    original: image,
    thumbnail: image,
    description: `${location} - Image ${index + 1}`,
    originalAlt: `Property image ${index + 1}`,
    thumbnailAlt: `Thumbnail ${index + 1}`
  }))

  return (
    <div className="image-gallery-container">
      <ImageGallery
        items={galleryImages}
        showPlayButton={false}
        showFullscreenButton={true}
        showNav={true}
        showThumbnails={true}
        thumbnailPosition="bottom"
        slideDuration={450}
        slideInterval={3000}
        lazyLoad={true}
        additionalClass="property-image-gallery"
      />
    </div>
  )
}

export default PropertyImageGallery