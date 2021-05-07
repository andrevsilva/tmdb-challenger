import React , { useState , useEffect } from 'react';
import '../index.css'
import { fetchGenre, fetchMovies , fetchMovieGenre , fetchPersons, fetchTopratedMovie} from "../services"

import RBCarousel from 'react-bootstrap-carousel'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import "react-bootstrap-carousel/dist/react-bootstrap-carousel.css"
import { Link } from 'react-router-dom'
import ReactStars from 'react-rating-stars-component'

const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      partialVisibilityGutter: 40 
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      partialVisibilityGutter: 30 
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      partialVisibilityGutter: 30 
    }
  }

export function Home() {
    const [nowPlay , setNowPlay] = useState([]);
    const [genres, setGenres] = useState([])
    const [movieByGenre, setMovieGenre] = useState([]);
    const [persons, setPersons] = useState([]);
    const [topRated, setTopRated] = useState([]);
    
    useEffect(() => {
        const fetchAPI = async () => {
            setNowPlay(await fetchMovies());
            setGenres(await fetchGenre());
            setMovieGenre(await fetchMovieGenre(28));
            setPersons(await fetchPersons())
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
                <div className="carousel-center">
                    <img style={{height: 700}} src={item.backPoster} alt={item.title} />
                </div>
                <div className="carousel-center">
                    <i className="far fa-play-circle" style={{fontSize: 95, color: "#f4c10f"}}/>
                </div>
                <div className="carousel-caption" style={{textAlign: "center" , fontSize: 35}}>
                    {item.title}
                </div>
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
    
    const movieList = movieByGenre.slice(0, 500).map((item, index) => {
        return (
            <div className="" key={index}>
                <div className="card">
                    <Link to={`/movie/${item.id}`} >
                        <img className="img-fluid" src={item.poster} alt={item.title} />
                    </Link>
                </div>
                <div className="mt-3">
                    <p style={{fontWeight: "bolder"}}>{item.title}</p>
                    <p>Rated: {item.rating}</p>
                    <ReactStars count={item.rating} size={20} color={"#f4c10f"}></ReactStars>
                </div>
            </div>
        )
    })

    const trendingPersons = persons.slice(0, 4).map((p, i) => {
        return (
            <div className="col-md-3 text-center" key={i}>
                <img className="img-fluid rounded-circle mx-auto d-block" src={p.profileImg} alt={p.name} />
                <p className="font-weight-bold text-center">{p.name}</p>
                <p className="font-weight-light text-center" style={{color: "#5a606b"}}>
                    Trending for {p.known}
                </p>
            </div>
        )
    });

    const topRatedList = topRated.slice(0, 500).map((item, index) => {
        return (
            <div className="" key={index}>
                <div className="card">
                    <Link to={`/movie/${item.id}`}>
                        <img className="img-fluid" src={item.poster} alt={item.title} />
                    </Link>
                </div>
                <div className="mt-3">
                    <p style={{fontWeight: "bolder"}}>{item.title}</p>
                    <p>Rated: {item.rating}</p>
                    <ReactStars count={item.rating} size={20} color={"#f4c10f"}></ReactStars>
                </div>
            </div>
        )
    })

    return (
        <div className="container">
            <div className="row mt-2">
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
                    <ul className="list-inline">
                        {genreList}
                    </ul>
                </div>
            </div>

            

            <div className="row mt-3">
                <Carousel partialVisible={true} responsive={responsive} enterMode = { true }>
                    {movieList}
                </Carousel>
            </div>

            <div className="row mt-3">
                <div className="col">
                    <p className="font-weight-bold" style={{color: "#5a606b"}}>
                        TRENDING PERSONS ON THIS WEEK
                    </p>
                </div>
            </div>

            <div className="row mt-3">
                <div className="col">
                    <div className="float-right">
                        <i className="far fa-arrow-alt-circle-right" />
                    </div>
                </div>
            </div>

            <div className="row mt-3">
                {trendingPersons}
            </div>

            <div className="row mt-3">
                <div className="col">
                    <p className="font-weight-bold" style={{color: "#5a606b"}}>
                        TOP RATED MOVIES
                    </p>
                </div>
            </div>

            <div className="row mt-3">
                <div className="col">
                    <div className="float-right">
                        <i className="far fa-arrow-alt-circle-right" />
                    </div>
                </div>
            </div>

            <div className="row mt-3">
                <Carousel partialVisible={true} responsive={responsive} enterMode = { true }>
                    {topRatedList}
                </Carousel>
            </div>

            <hr className="mt-5" style={{borderTop: "1px solid #5a606b"}}></hr>

            <div className="row mt-3 mb-5">
                <div className="col-md-8 col-sm" style={{color: "#5a606b"}}>
                    <h3>ABOUT ME</h3>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo neque voluptatum, totam at consectetur placeat minus repudiandae ea fugit autem inventore doloremque reiciendis aliquid. Exercitationem porro sint iusto harum sapiente.</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore temporibus quo, nulla totam fugiat officiis magnam rem deleniti? Facere modi recusandae debitis, numquam perferendis commodi illum nihil dignissimos nobis voluptatum.</p>
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

                <div className="col-md-4 col-sm-6" style={{color: "#5a606b"}}>
                    <h3>KEEP IN TOUCH</h3>
                    <ul className="list-unstyled">
                        <li>
                            <p>
                                <strong>
                                    <i className="fas fa-map-market-alt" />
                                    Address: city, state, country
                                </strong>
                            </p>
                        </li>
                    </ul>
                </div>
            </div>
         </div>

         
    );
};