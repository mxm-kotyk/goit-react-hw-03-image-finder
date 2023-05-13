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

  incrementPage = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  resetPage = () => {
    this.setState({ page: 1 });
  };

  handleSubmit = async searchQuery => {
    this.resetPage();
    this.setState({
      searchQuery,
      isLoading: true,
    });

    try {
      const result = await API.getImages(searchQuery, this.state.page);
      this.setState({ images: result.hits });
    } catch (error) {
      console.log(error);
      this.setState({ error: error.message });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleLoadMore = async () => {
    this.incrementPage();
    this.setState({ isLoading: true });

    try {
      const result = await API.getImages(
        this.state.searchQuery,
        this.state.page + 1
      );
      this.setState(state => ({ images: [...state.images, ...result.hits] }));
    } catch (error) {
      console.log(error);
      this.setState({ error: error.message });
    } finally {
      this.setState({ isLoading: false });
    }
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
