import React from 'react';
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

export class App extends React.Component {
  state = {
    imageName: '',
    page: 1,
    images: [],
    error: '',
    showModal: false,
    largeImage: '',
    status: 'idle',
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.imageName !== this.state.imageName) {
      this.setState({ status: 'pending' });
      this.getImages()
        .catch(error => this.setState({ error, status: 'rejected' }));
    };
  };

  handleFormSubmit = imageName => {
    this.setState({
      imageName,
      page: 1,
      images: [],
    });
  };

  handleLargeImage = largeImageURL => {
    this.setState({
      largeImage: largeImageURL,
      showModal: true,
    });
  };

  toggleModal = () => {
    this.setState(prevState => ({
      showModal: !prevState.showModal,
      largeImage: '',
    }));
  };

  getImages = async () => {
    const { imageName, page } = this.state;
    const data = await fetchImages(imageName, page);
    
    if (data.total === 0) {
      throw new Error('Sorry, there are no images matching your search query. Please try again.');
    };

    if (data.hits.length === 0) {
      toast.error("We're sorry, but you've reached the end of search results.");
      this.setState({ status: 'rejected' });
    
      return;
    };

    this.setState(prevState => ({
      images: [...prevState.images, ...data.hits],
      page: prevState.page + 1,
      status: 'resolved',
    }));
  };

  render() {
    const { images, showModal, largeImage, error, status } = this.state;

    if (status === 'idle') {
      return (
        <>
          <Container>
            <Searchbar onSubmit={this.handleFormSubmit} />
            <Info>Your query is empty...</Info>
            <ToastContainer position="top-center" />
          </Container>
        </>
      );
    };

    if (status === 'pending') {
      return (
        <>
          <Container>
            <Searchbar onSubmit={this.handleFormSubmit} />
            <PageLoader />
            <ToastContainer position="top-center" />
          </Container>
        </>
      );
    };

    if (status === 'rejected') {
      return (
        <>
          <Container>
            <Searchbar onSubmit={this.handleFormSubmit} />
            <Info>{error.message}</Info>
            <Gallery images={images} onImgClick={this.handleLargeImage} />
              {showModal && <Modal onClose={this.toggleModal}>
                <img src={largeImage} alt="" />
              </Modal>}
            <ToastContainer position="top-center" />
          </Container>
        </>
      );
    };

    if (status === 'resolved') {
      const itemsPerPage = 12;

      return (
        <>
          <Container>
            <Searchbar onSubmit={this.handleFormSubmit} />
            <Gallery images={images} onImgClick={this.handleLargeImage} />
            {images.length >= itemsPerPage && <LoadButton onClick={this.getImages} />}
              {showModal && <Modal onClose={this.toggleModal}>
                <img src={largeImage} alt="" />
              </Modal>}
            <ToastContainer position="top-center" />
          </Container>
        </>
      );
    };
  };
};