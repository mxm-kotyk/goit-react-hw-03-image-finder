import { BarLoader } from 'react-spinners';

export const Loader = () => {
  return (
    <>
      <BarLoader
        color="#3f51b5"
        width={150}
        height={10}
        aria-label="Loading Spinner"
      />
    </>
  );
};
