import skull from './skull.gif';
const GifComponent = () => {
  // Direct URL to the GIF from Tenor


  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <img src={skull} alt="Hacking GIF" style={{ width: '90px', height: '90px' }} />
    </div>
  );
};

export default GifComponent;
