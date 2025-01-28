import Lottie from 'lottie-react';

import animationData from '@/assets/loader.json';

const Loader = () => {
  const loaderStyle = {
    width: '8%',
    height: '8%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    margin: 'auto',
    marginTop: '300px',
  };

  return (
    <div style={loaderStyle}>
      <Lottie animationData={animationData} />
    </div>
  );
};

export default Loader;
