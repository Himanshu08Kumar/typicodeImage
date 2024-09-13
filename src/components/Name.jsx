import React, { useEffect, useState } from 'react';

const Name = () => {
  const [data, setData] = useState([]);
  const [selectedAlbumData, setSelectedAlbumData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/photos');
        const data = await response.json();
        setData(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const uniqueId = [...new Set(data.map((item) => item.albumId))];
  const filterImage = data.filter((item) => item.albumId === selectedAlbumData);
  const handleClick = (albumId) => {
    setSelectedAlbumData(albumId);
  };

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h1 className="text-center text-3xl font-bold mb-4 text-gray-700 border-b-4">Select Album</h1>

      {/* Album buttons */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {uniqueId.map((item) => (
          <button
            key={item}
            onClick={() => handleClick(item)}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
          >
            Album {item}
          </button>
        ))}
      </div>

      {/* Selected Album */}
      {selectedAlbumData && (
        <div>
          <h2 className="text-center text-2xl font-semibold mb-4">
            Album {selectedAlbumData}
          </h2>

          {/* Display images */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
            {filterImage.map((item) => (
              <span key={item.id} className="">
                <img
                  src={item.thumbnailUrl}
                  alt=""
                  className="rounded-lg shadow-lg hover:scale-105 transition-transform"
                />
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Name;
