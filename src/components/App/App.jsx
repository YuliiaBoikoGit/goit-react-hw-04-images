import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Container, Info } from "./App.styled";
import { Searchbar } from 'components/Searchbar/Searchbar';
import { Gallery } from 'components/ImageGallery/ImageGallery';
import { LoadButton } from 'components/Button/Button';
import { fetchImages } from "api/galleryApi";
import { Modal } from 'components/Modal/Modal';
import { PageLoader } from 'components/Loader/Loader';

export const App = () => {
  const [imageName, setImageName] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [largeImage, setLargeImage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!imageName) return;

      setIsLoading(true);
      fetchImages(imageName, page)
      .then(
        data => {
          if (data.total === 0) {
            throw new Error('Sorry, there are no images matching your search query. Please try again.');
          };

          if (data.hits.length === 0) {
            setImageName('');
            return toast.error("We're sorry, but you've reached the end of search results.");
          };

          setImages(prevState => [...prevState, ...data.hits]);
        })
      .catch(error => setError(error))
      .finally(() => setIsLoading(false));
  }, [imageName, page]);

  const handleFormSubmit = imageName => {
    setImageName(imageName);
    setPage(1);
    setImages([]);
    setError('');
  };

  const handleLargeImage = largeImageURL => {
    setLargeImage(largeImageURL);
    setShowModal(true);
  };

  const toggleModal = () => {
    setShowModal(prevState => !prevState);
    setLargeImage('');
  };

  const loadMore = () => {
    setPage(prevState => prevState + 1);
  };

  const itemsPerPage = 12;

  return (
      <Container>
        <Searchbar onSubmit={handleFormSubmit} />

        {images.length === 0 && !error && !isLoading && <Info>Your query is empty...</Info>}

        {isLoading && <PageLoader />}

        <Gallery images={images} onImgClick={handleLargeImage}/>

        {error && <Info>{error.message}</Info>}

        {images.length >= itemsPerPage && imageName && <LoadButton onClick={loadMore} />}
        
        {showModal && <Modal onClose={toggleModal}>
            <img src={largeImage} alt="" />
        </Modal>}
        
        <ToastContainer position="top-center" />
      </Container>
  );
};