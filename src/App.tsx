import { useState } from 'react';
import './App.css';
import Select from './components/Select';

// Interface matching the one from the Select component
interface ImageItem {
  id: string;
  title: string;
  url: string;
}

function App() {
  const [selectedImage, setSelectedImage] = useState<ImageItem | null>(null);
  console.log(selectedImage)

  const handleImageChange = (image: ImageItem) => {
    setSelectedImage(image);
  };

  return (
    <section className='w-full flex'>
      <Select onChange={handleImageChange} defaultValue="1" />
    </section>
  );
}

export default App;
