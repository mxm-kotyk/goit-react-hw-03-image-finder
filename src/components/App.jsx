import { Component } from 'react';
import { AppWrapper, CenteredContainer } from './App.styled';
import { Searchbar } from './Searchbar';
import { ImageGallery } from './ImageGallery';
import { LoadMoreButton } from './LoadMoreButton';
import { Loader } from './Loader';
import * as API from './services/pixabay-api';

export class App extends Component {
  state = {
    searchQuery: '',
    images: [],
    isLoading: false,
    page: 1,
    error: null,
    totalImages: 0,
  };

  async componentDidUpdate(_, prevState) {
    const { searchQuery, page } = this.state;

    try {
      if (prevState.searchQuery !== searchQuery) {
        this.setState({ images: [] });
        const searchResult = await this.getSearchResult(searchQuery, page);
        this.setState({ images: searchResult });
      }

      if (prevState.page !== page && page !== 1) {
        const searchResult = await this.getSearchResult(searchQuery, page);
        this.setState(pState => ({
          images: [...pState.images, ...searchResult],
        }));
        setTimeout(() => {
          window.scrollBy({
            top: 510,
            behavior: 'smooth',
          });
        }, 150);
      }
    } catch (error) {
      this.setState({ error: error.message });
    }
  }

  getSearchResult = async (searchQuery, page) => {
    this.setState({ isLoading: true });
    const result = await API.getImages(searchQuery, page);
    this.setState({ isLoading: false, totalImages: result.total });
    return result.hits;
  };

  handleSubmit = searchQuery => {
    this.setState({ searchQuery, page: 1 });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { images, isLoading, totalImages, searchQuery, error } = this.state;
    const { handleSubmit, handleLoadMore } = this;

    let infoBlock = error ? (
      <h2>
        Ooops, something went wrong... Server says: "{error}". Try reloading the
        page.
      </h2>
    ) : isLoading ? (
      <Loader />
    ) : images.length === 0 ? (
      searchQuery !== '' && (
        <h2>
          Sorry, there are no images matching "{searchQuery}". Please try again.
        </h2>
      )
    ) : images.length === totalImages ? (
      <h2>We're sorry, but you've reached the end of search results.</h2>
    ) : (
      <LoadMoreButton onClick={handleLoadMore} />
    );

    return (
      <AppWrapper>
        <Searchbar onSubmit={handleSubmit} />
        <ImageGallery images={images} />
        <CenteredContainer>{infoBlock}</CenteredContainer>
      </AppWrapper>
    );
  }
}
