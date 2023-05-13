import axios from 'axios';
axios.defaults.baseURL = 'https://pixabay.com/api';
const API_KEY = '34914076-a1f4109a1a2ff90f5349ae488';

// const searchParams = new URLSearchParams({
//   _limit: 5,
//   _sort: 'name',
// });

// https://pixabay.com/api/?q=cat&page=1&key=your_key&image_type=photo&orientation=horizontal&per_page=12

export const getImages = async (searchQuery, page) => {
  const response = await axios.get(
    `/?q=${searchQuery}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
  console.log(response.config.url);
  console.log(response.data);
  return response.data;
};
