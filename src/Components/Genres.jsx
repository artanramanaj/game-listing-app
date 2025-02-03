import React, { useEffect, useState } from 'react';
import { axiosInstance, key } from './../Services/GlobalApi.jsx';

function Genres({onGenreSelect }) {
    const [genres, setGenres] = useState([])
    const [findIndex, setFindIndex] = useState(0)
    useEffect(() => {
        getGenres();
        console.log("check genres here", genres)
    }, []);

    const getGenres = async () => {
        try {
            const {data} = await axiosInstance.get(`/genres?key=${key}`);
            setGenres(data.results)   
            console.log("check the data here for genres", data)
        } catch (error) {
            console.log("error", error);
        }
    };

    const changeGenres = (index, genreId) => {
        setFindIndex(index)
        onGenreSelect(genreId);
    }

    return (
        <div>
            {genres.map((genre, key) => (
               <div 
               onClick={() => changeGenres(key, genre.id)} 
               key={key} 
               className={`flex items-center gap-2 my-1 cursor-pointer p-3 hover:bg-gray-300 hover:rounded-lg ${findIndex === key ? 'bg-gray-300 rounded-lg' : ''}`}
             >
                    <img src={genre.image_background} alt="genreimg" width={60} height={60} className={`hover:scale-125 object-cover' ${findIndex === key ? 'scale-125' : ''}`} />
                    <h2>{genre.name}</h2>
                </div>
            ))}
        </div>
    );
}

export default Genres;
