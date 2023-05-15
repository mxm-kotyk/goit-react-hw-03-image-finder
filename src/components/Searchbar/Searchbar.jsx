import PropTypes from 'prop-types';
import { Formik } from 'formik';
import {
  Header,
  SearchForm,
  SearchButton,
  SearchButtonLabel,
  SearchField,
  SearchIcon,
} from './Searchbar.styled';

const initialState = {
  searchQuery: '',
};

export const Searchbar = ({ onSubmit }) => {
  const handleSubmit = (values, actions) => {
    onSubmit(values.searchQuery);
    actions.resetForm();
  };

  return (
    <Header>
      <Formik initialValues={initialState} onSubmit={handleSubmit}>
        <SearchForm>
          <SearchButton type="submit">
            <SearchIcon />
            <SearchButtonLabel>Search</SearchButtonLabel>
          </SearchButton>

          <SearchField
            name="searchQuery"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </SearchForm>
      </Formik>
    </Header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
