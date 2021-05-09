import React, { useState , useEffect } from 'react';
import '../index.css'
import { Link } from 'react-router-dom';
import { fetchCasts, fetchMovieDetail, fetchMovieVideo, fetchSimilarMovie } from '../services';

import "react-bootstrap-carousel/dist/react-bootstrap-carousel.css";
import { Modal } from 'react-bootstrap';
import ReactPlayer from 'react-player';
import ReactStars from 'react-rating-stars-component';

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Header , Logo , ArrowLeft , ArrowRight} from './styles';

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

export function MovieDetails({match}) {
    let params = match.params;
    let genres = [];

    const [isOpen, setIsOpen] = useState(false);
    const [detail, setDetail] = useState([]);
    const [video, setVideo] = useState([]);
    const [casts, setCasts] = useState([]);
    const [similarMovie, setSimilarMovie] = useState([]);

    useEffect(() => {
        const fetchAPI = async () => {
            setDetail(await fetchMovieDetail(params.id));
            setVideo(await fetchMovieVideo(params.id))
            setCasts(await fetchCasts(params.id));
            setSimilarMovie(await fetchSimilarMovie(params.id));
        };

        fetchAPI();
    }, [params.id]);

    genres = detail.genres;

    const MoviePlayerModal = (props) => {
        const youtubeUrl = 'https://www.youtube.com/watch?v=';
        return(
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
        <Modal.Header closeButton>
          <Modal.Title
            id="contained-modal-title-vcenter"
            style={{ color: "#000000", fontWeight: "bolder" }}
          >
            {detail.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "#000000" }}>
          <ReactPlayer
            className="container-fluid"
            url={youtubeUrl + video.key}
            playing
            width="100%"
          ></ReactPlayer>
        </Modal.Body>
      </Modal>
        );
    };

    let genresList;
    if(genres) {
        genresList = genres.map((g, i) => {
            return(
                <li className="list-inline-item" key={i}>
                    <button type="button" className="btn btn-outline-info">
                        {g.name}
                    </button>
                </li>
            )
        });
    };

    const castList = casts.slice(0, 50).map((c, i) => {
        return (
            <div className="" key={i}>
                <img className="img-fluid rounded-circle mx-auto d-block" src={c.img} alt={c.name} />
                <p className="font-weight-bold text-center">{c.name}</p>
                <p className="font-weight-light text-center" style={{color: "#5a606b"}}>
                    {c.character}
                </p>
            </div>
        )
    })

    const similarMovieList = similarMovie.slice(0, 50).map((item, index) => {
        return (
            <div className="" key={index}>
                <div className="card">
                    <Link to={`/movie/${item.id}`} >
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
                <Link to="/">
                    <Logo src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg"/>
                </Link>
            </Header>
            

            <div className="container">
                <div className="row mt-2">
                    <MoviePlayerModal
                    show={isOpen}
                    onHide={() => {
                        setIsOpen(false);
                    }}
                    ></MoviePlayerModal>
                    <div className="col text-center" style={{ width: "100%", position: "relative" }}>
                        <img
                            className="img-fluid"
                            src={`http://image.tmdb.org/t/p/original/${detail.backdrop_path}`}
                            alt={detail.title}
                        ></img>
                        <div className="carousel-center">
                            <i
                            onClick={() => setIsOpen(true)}
                            className="far fa-play-circle"
                            style={{ fontSize: 95, color: "#f4c10f", cursor: "pointer" }}
                            ></i>
                        </div>
                        <div
                            className="carousel-caption"
                            style={{ textAlign: "center", bottom: 0}}
                        >
                            {detail.title}
                        </div>
                    </div>
                </div>
                
                <div className="row mt-3">
                    <div className="col">
                        <p style={{color: "#5a606b", fontWeight: "bolder"}}>
                            GENRE
                        </p>
                    </div>
                </div>

                <div className="row mt-3">
                    <div className="col">
                        <ul className="list-inline">
                            {genresList}
                        </ul>
                    </div>
                </div>

                <div className="row mt-3">
                    <div className="col">
                        <div className="text-center">
                            <ReactStars count={detail.vote_average} size={20} color={"#f4c10f"}>

                            </ReactStars>
                        </div>
                        <div className="mt-3">
                            <p style={{color: "#5a606b", fontWeight: "bolder"}}>OVERVIEW</p>
                            {detail.overview}
                        </div>
                    </div>
                </div>

                <div className="row mt-3">
                    <div className="col md-3">
                        <p style={{color: "#5a606b", fontWeight: "bolder"}}>
                            RELEASE DATE
                        </p>
                        <p style={{color: "#f4c10f"}}>
                            {detail.release_date}
                        </p>
                    </div>

                    <div className="col md-3">
                        <p style={{color: "#5a606b", fontWeight: "bolder"}}>
                            RUN TIME
                        </p>
                        <p style={{color: "#f4c10f"}}>
                            {detail.runtime}
                        </p>
                    </div>

                    <div className="col md-3">
                        <p style={{color: "#5a606b", fontWeight: "bolder"}}>
                            BUDGET
                        </p>
                        <p style={{color: "#f4c10f"}}>
                            {detail.budget}
                        </p>
                    </div>

                    <div className="col md-3">
                        <p style={{color: "#5a606b", fontWeight: "bolder"}}>
                            HOMEPAGE
                        </p>
                        <p style={{color: "#f4c10f"}}>
                            {detail.homepage}
                        </p>
                    </div>
                </div>

                <div className="row mt-3">
                    <div className="col">
                        <p style={{color: "#5a606b", fontWeight: "bolder"}}>
                            CASTS
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
                        {castList}
                    </Carousel>
                </div>

                <div className="row mt-3">
                    <div className="col">
                        <p style={{color: "#5a606b", fontWeight: "bolder"}}>
                            SIMILAR MOVIES
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
                        {similarMovieList}
                    </ Carousel>
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
    )
};