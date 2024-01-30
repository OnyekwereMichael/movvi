import Movie from "./component/movie";
import TopMovie from "./component/topmovies";
import { useEffect, useState } from "react";
import axios from "axios";
import icon from "../src/iconer.png";
import movieicon from "../src/movieicon.jpg";
import facebook from "../src/facebook.png";
import twitter from "../src/twitter.png";
import instagram from "../src/instagram.png";
import youtube from "../src/youtube.png";
import { BiMenuAltRight } from "react-icons/bi";
// import TopMovie from "../component/top-movies";

function Home() {
  const [Menuopen, setMenuopen] = useState(false);
  const getMenuStyles = (Menuopen) => {
    if (document.documentElement.clientWidth <= 800) {
      return { top: !Menuopen && "-100%" };
    }
  };

  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [randomMovie, setRandomMovie] = useState(null);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const searchMovies = async () => {
    const options = {
      method: "GET",
      url: "https://moviesverse1.p.rapidapi.com/movies/movieBySearch/1",
      params: { search: searchTerm },
      headers: {
        "X-RapidAPI-Key": "3c60a1b8c8msh6cdce5e3d2f6d4cp12b2edjsn34415af3a6b3",
        "X-RapidAPI-Host": "moviesverse1.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      setMovies(response?.data?.movies);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const getAllMovies = async () => {
    const options = {
      method: "GET",
      url: "https://moviesverse1.p.rapidapi.com/movies/1",
      headers: {
        "X-RapidAPI-Key": "3c60a1b8c8msh6cdce5e3d2f6d4cp12b2edjsn34415af3a6b3",
        "X-RapidAPI-Host": "moviesverse1.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      console.log(response);
      setMovies(response?.data?.movies);
      setRandomMovie(getRandomMovie(response?.data?.movies));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllMovies();
  }, []);

  const getRandomMovie = (moviesArray) => {
    if (moviesArray && moviesArray.length > 0) {
      const randomIndex = Math.floor(Math.random() * moviesArray.length);
      return moviesArray[randomIndex];
    }
    return null;
  };

  return (
    <div className="overall">
      <section className="overall_two">
        <div>
          <img src={movieicon} alt="" className="movieicon" sizes={40} />
        </div>
        <nav>
          <div className="nav">
            <div className="sub-nav-details-search">
              <div className="search-div-sub">
                <input
                  value={searchTerm}
                  onChange={handleChange}
                  type="search"
                  placeholder="what do you want to watch"
                />
                <button className="butt_1">
                  <img src={icon} alt="" onClick={searchMovies} />
                </button>
              </div>
            </div>
          </div>
        </nav>

        <div className="sign_log">
          <a href="">Sign In</a>
          <a href="">Log in</a>
        </div>
        
       
        <BiMenuAltRight size={50} className="bi"/>
     
      </section>


      <div className="sign_lo" 
        style={getMenuStyles(Menuopen)}>
          <a href="">Sign In</a>
          <a href="">Log in</a>
        </div>

      <div className="featured">
        {movies.length > 0 ? (
          movies.map((movie, index) => <Movie data={movie} key={index} />)
        ) : (
          <p>No movies found</p>
        )}
      </div>

      <footer>
        <div>
          <img src={facebook} alt="" />
          <img src={twitter} alt="" />
          <img src={instagram} alt="" />
          <img src={youtube} alt="" />
        </div>

        <div>
          <p>
            <a href="">Home</a>
          </p>
          <p>
            <a href="">Trending</a>
          </p>
          <p>
            <a href="">Faetured</a>
          </p>
        </div>

        <hr className="mt-10" />
        <div>
          <p>@2021 MovieBox by Adriana Eka Prayudha</p>
        </div>
      </footer>
    </div>
  );
}

export default Home;
