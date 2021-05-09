import styled from "styled-components";

export const Header = styled.header `
    width: 100%;
    height: 70px;
    background-color: #151c26;
    position: fixed;
    z-index: 100;
    top: 0;
    padding: 15px;
`
export const Logo = styled.img`
    width: 150px;
    margin: 0 auto;
    display: block;
    position: relative;
    top: 12px;
`
export const ArrowLeft = styled.button`
    font-size: 45px;
    left: 0;
    color: rgb(244, 193, 15);
    border: none;
    background: transparent;
    height: 333px;
    position: absolute;
    top: 0;
    opacity: .5;
    transition: opacity .15s ease;
    &:hover{
        background: #000;
        opacity: .5;
    }
    @media(max-width: 960px) {
        display: none
    }
`
export const ArrowRight = styled.button`
    font-size: 45px;
    right: 0;
    float: right;
    color: rgb(244, 193, 15);
    border: none;
    background: transparent;
    height: 333px;
    position: absolute;
    top: 0;
    opacity: .5;
    transition: opacity .15s ease;
    &:hover{
        background: #000;
        opacity: .5;
    }
    @media(max-width: 960px) {
        display: none
    }
    
`
export const NameMovies = styled.p`
    font-weight: bolder;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`