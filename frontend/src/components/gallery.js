import ImageGallery from 'react-image-gallery';

export const Gallery = ({ images }) => {
    return (
        <div className="mt-4 d-flex justify-content-center">
            {images.length > 0 ?
            <ImageGallery items={images} /> :
            <p>Emplty</p>
            }
        </div>
    )
}