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
  };

  async componentDidUpdate(_, prevState) {
    const { searchQuery, page } = this.state;
    if (prevState.searchQuery !== searchQuery) {
      const searchResult = await this.getSearchResult(searchQuery, page);
      this.setState({ images: searchResult });
    }

    if (prevState.page !== page && page !== 1) {
      const searchResult = await this.getSearchResult(searchQuery, page);
      this.setState(pState => ({
        images: [...pState.images, ...searchResult],
      }));
    }
  }

  getSearchResult = async (searchQuery, page) => {
    this.setState({ isLoading: true });
    const result = await API.getImages(searchQuery, page);
    this.setState({ isLoading: false });
    return result.hits;
  };

  handleSubmit = searchQuery => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    this.setState({ searchQuery, page: 1 });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    return (
      <AppWrapper>
        <Searchbar onSubmit={this.handleSubmit} />
        <ImageGallery images={this.state.images} />
        <CenteredContainer>
          {this.state.images.length !== 0 && (
            <LoadMoreButton onClick={this.handleLoadMore} />
          )}
          {this.state.isLoading && <Loader />}
        </CenteredContainer>
        {/* <Modal /> */}
      </AppWrapper>
    );
  }
}
