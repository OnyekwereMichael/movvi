import Movie from "./component/movie"
import TopMovie from "./component/topmovies";
import { useEffect, useState } from "react";
import axios from 'axios'
import icon from "../src/iconer.png"
// import TopMovie from "../component/top-movies";

function Home() {

    const [movies, setMovies] = useState([])
    const [searchTerm, setSearchTerm] = useState("")
    const [randomMovie, setRandomMovie] = useState(null);

    const handleChange = (e) => {
        setSearchTerm(e.target.value)
    }

    const searchMovies = async () => {
        const options = {
            method: 'GET',
            url: 'https://moviesverse1.p.rapidapi.com/movies/movieBySearch/1',
            params: { search: searchTerm },
            headers: {
                'X-RapidAPI-Key': '3c60a1b8c8msh6cdce5e3d2f6d4cp12b2edjsn34415af3a6b3',
                'X-RapidAPI-Host': 'moviesverse1.p.rapidapi.com'
            }
        };

        try {
            const response = await axios.request(options);
            setMovies(response?.data?.movies)
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    }

    const getAllMovies = async () => {

        const options = {
            method: 'GET',
            url: 'https://moviesverse1.p.rapidapi.com/movies/1',
            headers: {
                'X-RapidAPI-Key': '3c60a1b8c8msh6cdce5e3d2f6d4cp12b2edjsn34415af3a6b3',
                'X-RapidAPI-Host': 'moviesverse1.p.rapidapi.com'
            }
        };

        try {
            const response = await axios.request(options);
            console.log(response);
            setMovies(response?.data?.movies)
            setRandomMovie(getRandomMovie(response?.data?.movies));
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getAllMovies()
    }, [])


    const getRandomMovie = (moviesArray) => {
        if (moviesArray && moviesArray.length > 0) {
            const randomIndex = Math.floor(Math.random() * moviesArray.length);
            return moviesArray[randomIndex];
        }
        return null;
    }


    return (
        <div className="overall">
            <nav>
                <div className="nav">
                    <div className="sub-nav-details-search">
                        <div className="search-div-sub">
                            <input value={searchTerm} onChange={handleChange} type="search" placeholder="search..." />
                            <img src={icon}alt="" onClick={searchMovies} />
                        </div>
                    </div>

                    <div className="nav-details-icon">
                        <img src=".\img\notify.svg" alt="" onClick={searchMovies} className="image"/>
                    </div>
                </div>
            </nav>



            <div className="featured">
                {movies.length > 0 ? (
                    movies.map((movie, index) => (
                        <Movie data={movie} key={index} />
                    ))
                ) : (
                    <p>No movies found</p>
                )}
            </div>
        </div>
    )
}

export default Home;

