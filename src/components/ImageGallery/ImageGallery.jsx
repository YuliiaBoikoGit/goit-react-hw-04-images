import PropTypes from "prop-types";
import { ImageGallery } from "./ImageGallery.styled";
import { GalleryItem } from "components/ImageGalleryItem/ImageGalleryItem";

export const Gallery = ({images, onImgClick}) => {
    return (
        <ImageGallery>
            {images.map(image =>
                <GalleryItem key={image.id} image={image} onImgClick={onImgClick} />
            )}    
        </ImageGallery>
    );
};

Gallery.propTypes = {
    images: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
        }),
    ),        
    onImgClick: PropTypes.func.isRequired,
};