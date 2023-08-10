import React from "react";


import '../styles/home.css';
import '../styles/allPosts.css';
import '../styles/singlePage.css';
import { Link } from "react-router-dom";
import BannerImage from "../assets/hero.jpg";


function Home() {
  return (
    <div className="hero">
      <div className="hero__container" style={{backgroundImage: `url(${BannerImage})`}}>
        <div className="hero__content">
          <h1>We have the best recipies</h1>
          <p>You will find any recipie you need!</p>
          <Link to="/allRecepies" >
          <button className="btn"> SEE OUR RECIPIES </button>
          </Link>
        </div>
    
      </div>
    </div>
  );
}

export default Home;