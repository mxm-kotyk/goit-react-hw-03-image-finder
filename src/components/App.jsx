import { Component } from 'react';
import { AppWrapper, CenteredContainer } from './App.styled';
import { Searchbar } from './Searchbar';
import { ImageGallery } from './ImageGallery';
import { LoadMoreButton } from './LoadMoreButton';
import { Loader } from './Loader';
// import { Modal } from './Modal/Modal';
import * as API from './pixabay-api/pixabay-api';

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
      }
    } catch (error) {
      console.log(error);
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
    console.log(this.state.images.length === this.state.totalImages);
  };

  render() {
    const { images, isLoading, totalImages } = this.state;
    const { handleSubmit, handleLoadMore } = this;

    return (
      <AppWrapper>
        <Searchbar onSubmit={handleSubmit} />
        <ImageGallery images={images} />
        <CenteredContainer>
          {isLoading ? (
            <Loader />
          ) : (
            images.length !== 0 &&
            images.length !== totalImages && (
              <LoadMoreButton onClick={handleLoadMore} />
            )
          )}
        </CenteredContainer>
        {/* <Modal /> */}
      </AppWrapper>
    );
  }
}
