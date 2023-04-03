import { useState, useEffect } from 'react';
import { fetchImages } from 'services';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import { Button } from './Button/Button';
import PropTypes from 'prop-types';
import css from './App.module.css';

const imagePerPage = 12;

export const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [modalImage, setModalImage] = useState('');
  const [modalAlt, setModalAlt] = useState('');
  const [error, setError] = useState(null);
  const [isLoad, setIsLoad] = useState(false);
  const [loadMore, setLoadMore] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      return;
    }
    setIsLoad(true);
    setLoadMore(false);
    fetchImages(searchQuery, page)
      .then(images => {
        if (images.hits.length === 0) {
          return alert('No image found');
        }
        setImages(prevImages => [...prevImages, ...images.hits]);
        setLoadMore(page < Math.ceil(images.total / imagePerPage));
      })
      .catch(error => setError(true))
      .finally(() => {
        setIsLoad(false);
      });
  }, [searchQuery, page]);

  const searchHandler = searchQuery => {
    setSearchQuery(searchQuery);
    setImages([]);
    setPage(1);
  };

  const loadMoreHandler = () => {
    setPage(page + 1);
  };

  const openModal = (image, tags) => {
    setModalImage(image);
    setModalAlt(tags);
    setShowModal(true);
  };

  const closeModal = () => {
    setModalImage('');
    setModalAlt('');
    setShowModal(false);
  };

  return (
    <div className={css.app}>
      <Searchbar searchHandler={searchHandler} />
      {isLoad && <Loader />}
      {error && <h1>{error.message}</h1>}
      {images.length !== 0 && (
        <ImageGallery images={images} openModal={openModal} />
      )}
      {showModal && (
        <Modal
          modalImage={modalImage}
          modalAlt={modalAlt}
          closeModal={closeModal}
        />
      )}
      {loadMore && <Button onLoadMoreClick={loadMoreHandler} />}
    </div>
  );
};

App.propTypes = {
  searchQuery: PropTypes.string,
  page: PropTypes.number,
  modalImage: PropTypes.string,
  modalAlt: PropTypes.string,
  error: PropTypes.string,
  isLoad: PropTypes.bool,
  loadMore: PropTypes.bool,
  showModal: PropTypes.bool,
};
