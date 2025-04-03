import { ChevronDown } from 'lucide-react';
import React, { useState } from 'react';

// Define the image interface
interface ImageItem {
  id: string;
  title: string;
  url: string;
}

// Sample image data
const images: ImageItem[] = [
  {
    id: '1',
    title: 'Mountain Landscape',
    url: 'https://images.unsplash.com/photo-1604223190546-a43e4c7f29d7?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: '2',
    title: 'Ocean Sunset',
    url: 'https://images.unsplash.com/photo-1533371452382-d45a9da51ad9?q=80&w=1473&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: '3',
    title: 'Forest Trail',
    url: 'https://images.unsplash.com/photo-1605196560547-b2f7281b7355?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: '4',
    title: 'Desert Oasis',
    url: 'https://images.unsplash.com/photo-1691520326140-05a37ea5d9c9?q=80&w=1527&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: '5',
    title: 'City Skyline',
    url: 'https://images.unsplash.com/photo-1493134799591-2c9eed26201a?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
];

interface SelectProps {
  onChange?: (selectedImage: ImageItem) => void;
  defaultValue?: string;
}

const Select: React.FC<SelectProps> = ({ onChange, defaultValue }) => {
  const [selectedId, setSelectedId] = useState<string>(
    defaultValue || images[0].id
  );

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newId = e.target.value;
    setSelectedId(newId);

    const selectedImage = images.find((img) => img.id === newId);
    if (selectedImage && onChange) {
      onChange(selectedImage);
    }
  };

  const selectedImage =
    images.find((img) => img.id === selectedId) || images[0];

  return (
    <div className="select-container w-full grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
      {/* Left side - Selected Image Display */}
      <div className="preview-container col-span-1 flex flex-col gap-4">
        <h3 className="mb-2 text-white">{selectedImage.title}</h3>
        <div className="rounded-lg overflow-hidden transition-all duration-500">
          <img
            src={selectedImage.url}
            alt={selectedImage.title}
            className="w-full aspect-video object-cover transform transition-all duration-500 hover:scale-105"
          />
        </div>
      </div>

      {/* Right side - Select Dropdown */}
      <div className="select-box col-span-1 flex flex-col justify-start">
        <div className="mb-2">
          <label htmlFor="image-select" className="block text-white mb-2">
            Select an image:
          </label>
          <select
            id="image-select"
            value={selectedId}
            onChange={handleSelectChange}
            className="image-select w-full text-foreground border border-foreground-light/20 py-4 px-4 transition-all duration-300 rounded-2xl cursor-pointer">
            <button className='w-full flex items-center gap-6 justify-between cursor-pointer'>
                {/* @ts-expect-error - custom element not recognized by TypeScript*/}
                <selectedcontent className="flex items-center gap-6"></selectedcontent>
              <span className='arrow transition-all duration-300'>
                <ChevronDown size={24} />
              </span>
            </button>
            {images.map((image) => (
              <option
                key={image.id}
                value={image.id}
                className="bg-background/80 hover:bg-background py-4 px-4 cursor-pointer flex items-center gap-6 border-y border-foreground-light/20 group transition-all duration-300">
                <div className="w-18 aspect-[4/3] rounded-xl overflow-hidden">
                  <img src={image.url} alt={image.title} className="w-full h-full group-hover:scale-125 transition-all duration-300" />
                </div>
                <p className="!text-foreground">{image.title}</p>
              </option>
            ))}
          </select>
        </div>

        {/* Image Thumbnails */}
        {/* <div className="image-thumbs mt-6">
          <h4 className="mb-2 text-white">All Images</h4>
          <div className="grid grid-cols-3 gap-2 mt-3 max-h-[300px] overflow-y-auto scrollbar-hidden">
            {images.map((image) => (
              <div
                key={image.id}
                className={`thumbnail relative rounded-md overflow-hidden cursor-pointer transition-all duration-300 ${
                  image.id === selectedId
                    ? 'ring-2 ring-white scale-[0.95]'
                    : 'opacity-70 hover:opacity-90'
                }`}
                onClick={() => {
                  setSelectedId(image.id);
                  if (onChange) onChange(image);
                }}>
                <img
                  src={image.url}
                  alt={image.title}
                  className="w-full aspect-[3/2] object-cover"
                />
              </div>
            ))}
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Select;
