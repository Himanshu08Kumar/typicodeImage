import React, { useEffect, useState } from 'react'

const Name = () => {
    const [data, setData ] = useState([]);
    const [selectedAlbumData, setSelectedAlbumData] = useState(null);

    useEffect(() =>{
        const fetchdata = async() =>{
            try{
                const response = await fetch('https://jsonplaceholder.typicode.com/photos');
                const data = await response.json();
                setData(data);
                console.log(data);
            }catch(error){
                console.log(error);
            }
        }
        fetchdata();
    },[])

    const uniqueId = [...new Set(data.map(item => item.albumId))]
    const filterImage = data.filter((item) => item.albumId === selectedAlbumData)
    const handleClick = (albumId) =>{
        setSelectedAlbumData(albumId);
    }

  return (
    <>
    <div>
        <h1>Select Album</h1>
        {uniqueId.map((item)=>(
            <button key={item} onClick={() => handleClick(item)}>Album{item}</button>
        ))}
    </div>
    { selectedAlbumData &&  (
        <div>
             <h2>Album{selectedAlbumData}</h2>
            {filterImage.map((item) =>(
                <span key={item.id}>
                <img src={item.thumbnailUrl} alt="" />
            </span>
            ))}
        </div>   
        )
    }
      
    </>
  )
}

export default Name
