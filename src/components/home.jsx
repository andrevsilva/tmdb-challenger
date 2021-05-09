import React , { useState , useEffect } from 'react';
import '../index.css'
import { fetchGenre, fetchMovies , fetchMovieGenre, fetchTopratedMovie} from "../services"

import RBCarousel from 'react-bootstrap-carousel'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import ReactStars from 'react-rating-stars-component'

import "react-bootstrap-carousel/dist/react-bootstrap-carousel.css"
import { Link } from 'react-router-dom'
import { Header , Logo , ArrowLeft , ArrowRight, NameMovies} from './styles';


const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
      partialVisibilityGutter: 40 
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 4,
      partialVisibilityGutter: 30 
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 3,
      partialVisibilityGutter: 30 
    }
  }

  const CustomButtonGroup = ({ next, previous, carouselState }) => {
    return (
      <div>
        <ArrowLeft  onClick={() => previous()}><i class="fas fa-chevron-left" /></ArrowLeft>
        <ArrowRight onClick={() => next()}><i class="fas fa-chevron-right" /></ArrowRight>
      </div>
    );
  };

export function Home() {
    const [nowPlay , setNowPlay] = useState([]);
    const [genres, setGenres] = useState([])
    const [movieByGenre, setMovieGenre] = useState([]);
    const [topRated, setTopRated] = useState([]);
    
    useEffect(() => {
        const fetchAPI = async () => {
            setNowPlay(await fetchMovies());
            setGenres(await fetchGenre());
            setMovieGenre(await fetchMovieGenre(28));
            setTopRated(await fetchTopratedMovie())
        };

        fetchAPI();
    } , [] );

    const handleGenreClick = async (genre_id) => {
        setMovieGenre(await fetchMovieGenre(genre_id));
    }

    const movies = nowPlay.slice(0, 5).map((item, index) =>{
        return(
            <div style={{width: "100%" , height: 500}} key={index}>
                <Link to={`/movie/${item.id}`} >
                    <div className="carousel-center">
                        <img style={{height: 700}} src={item.backPoster} alt={item.title} />
                    </div>
                    <div className="carousel-caption" style={{textAlign: "center" , fontSize: 35}}>
                        {item.title}
                    </div>
                </Link>
            </div>
        );
    });

    const genreList = genres.map((item, index) => {
        return(
            <li className="list-inline-item" key={index}>
                <button type="button" className="btn btn-outline-info" onClick={() => {
                    handleGenreClick(item.id)
                }}
                style={{
                    color: "#5a606b", 
                    border: "1px solid #5a606b",
                    marginBottom: "10px",
                    borderRadius: "25px",
                    fontWeight: "500",
                }}>
                    {item.name}
                </button>
            </li>
        )
    })
    
    const movieList = movieByGenre.slice(0, 50).map((item, index) => {
        return (
            <div className="" key={index}>
                <div className="card">
                    <Link to={`/movie/${item.id}`} >
                        <img className="img-fluid" src={item.poster} alt={item.title} />
                    </Link>
                </div>
                <div className="mt-3" id="info-similar">
                    <NameMovies style={{fontWeight: "bolder"}}>{item.title}</NameMovies>
                    <p>Rated: {item.rating}</p>
                    <ReactStars count={item.rating} size={20} color={"#f4c10f"}></ReactStars>
                </div>
            </div>
        )
    })

    const topRatedList = topRated.slice(0, 50).map((item, index) => {
        return (
            <div className="" key={index}>
                <div className="card">
                    <Link to={`/movie/${item.id}`}>
                        <img className="img-fluid" src={item.poster} alt={item.title} />
                    </Link>
                </div>
                <div className="mt-3" id="info-similar">
                    <p style={{fontWeight: "bolder"}}>{item.title}</p>
                    <p>Rated: {item.rating}</p>
                    <ReactStars count={item.rating} size={20} color={"#f4c10f"}></ReactStars>
                </div>
            </div>
        )
    })

    return (
        <div>
            <Header>
                <Logo src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg"/>
            </Header>
            <div className="container">
                <div className="row mt-3">
                    <div className="col">
                        <RBCarousel 
                            autoplay={true} 
                            pauseOnVisibility={true} 
                            slidesshowSpeed={500} 
                            version={4} 
                            indicators={true}
                        >
                            {movies}
                        </RBCarousel>
                    </div>
                </div>

                <div className="row mt-3">
                    <div className="col">
                        <p className="font-weight-bold" style={{color: "#5a606b"}}>
                            SELECT THE FILM GENRE
                        </p>
                    </div>
                </div>

                <div className="row mt-3">
                    <div className="col">
                        <ul className="list-inline">
                            {genreList}
                        </ul>
                    </div>
                </div>

                <div className="row mt-3">
                    <div className="col">
                        <p className="font-weight-bold" style={{color: "#5a606b", fontSize: 18}}>
                            <i class="fas fa-star" /> POPULAR MOVIES <i class="fas fa-star" />
                        </p>
                    </div>
                </div>

                <div className="row mt-3">
                    <Carousel 
                        partialVisible={true} 
                        responsive={responsive} 
                        enterMode = { true } 
                        arrows={false}
                        customButtonGroup={ <CustomButtonGroup /> }
                    >
                        {movieList}
                    </Carousel>
                </div>

                <div className="row mt-3">
                    <div className="col">
                        <p className="font-weight-bold" style={{color: "#5a606b", fontSize: 18}}>
                            <i class="fas fa-trophy" /> TOP RATED MOVIES <i class="fas fa-trophy" />
                        </p>
                    </div>
                </div>

                <div className="row mt-3">
                    <Carousel 
                        partialVisible={true} 
                        responsive={responsive} 
                        enterMode = { true } 
                        arrows={false}
                        customButtonGroup={ <CustomButtonGroup /> }
                    >
                        {topRatedList}
                    </Carousel>
                </div>

                <hr className="mt-5" style={{borderTop: "1px solid #5a606b"}}></hr>

                <div className="row mt-3 mb-5">
                    <div className="col-md-8 col-sm" style={{color: "#5a606b"}}>
                        <h3>ABOUT ME</h3>
                        <p>I am a challenge proposed by the company CARGUERO with the aim of testing my skills as a developer.</p>
                        <p>I am consuming the API The Movie Database (TMDb) which is used to show the most current and popular poster films.</p>
                        <ul className="list-inline">
                            <li className="list-inline-item">
                                <a href="/" style={{color: "#f4c10f"}}>
                                    <i className="fab fa-facebook" />
                                </a>
                            </li>
                            <li className="list-inline-item">
                                <a href="/" style={{color: "#f4c10f"}}>
                                    <i className="fab fa-youtube" />
                                </a>
                            </li>
                            <li className="list-inline-item">
                                <a href="/" style={{color: "#f4c10f"}}>
                                    <i className="fab fa-twitter" />
                                </a>
                            </li>
                            <li className="list-inline-item">
                                <a href="/" style={{color: "#f4c10f"}}>
                                    <i className="fab fa-instagram" />
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
         </div>

         
    );
};