import { BarLoader } from 'react-spinners';

export const Loader = () => {
  return (
    <>
      <BarLoader
        color="#3f51b5"
        // loading={loading}
        // cssOverride={override}
        size={150}
        aria-label="Loading Spinner"
      />
    </>
  );
};
