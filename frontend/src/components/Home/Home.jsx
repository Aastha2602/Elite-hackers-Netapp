import React from 'react';
import Navbar from "./Navbar.jsx";
import "./Home.css";
import Footer from "./Footer";
import Timeline from "./Timeline";
import image from "../pictures/LandingImage.png";
import idea from "../pictures/idea.jpeg";
import interests from "../pictures/interests.png";
import growth from "../pictures/growth.png";
import { NavLink } from 'react-router-dom';
import Chatbot from '../Content/Chatbot.js';

export default function Home() {
  return (
    <><Navbar />
  <section id="header">
    <div className='container-fluid nav_bg'>
      <div className='row'>
        <div className='col-10 mx-auto'>
          <div className='row'>
          <div className='col-md-6 pt-5 pt-lg-0 order-2 order-lg-1'>
            <h1 id="caption">Accelerate your learning with a 1-on-1 mentor </h1>
            <h2 id ="sub-caption" className='my-3'>Strong mentorship feedback from world class mentors to have learning and leveraging the skills needed to lead</h2>
          <div id="banner">
            <NavLink to="/login/new" className="btn-get-started" id="btn">Get Started</NavLink>
          </div>
          </div>
          <div className='col-lg-6 order-1 order-lg-2 header-img' id="image">
            <img src={image} className="img-fluid animated" id="floating" alt="homeimg" />
          </div>
          </div>
        </div>
      </div>
    </div>
    </section>
   {/* <Chatbot /> */}
    <main class="cards">
  <section class="card contact">
          <img src={idea} id="card-images"  />
            <h3>Give wings to your ideas</h3>
            <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</span>
            <button>Learn More</button>
        </section>
        <section class="card shop">
                <img src={interests} id="card-images" />
            <h3>Channelize your interests</h3>
            <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</span>
            <button>Learn More</button>
        </section>
        <section class="card about">
           <img src={growth} id="card-images"  />
              <h3>Take Forward your career</h3>
            <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</span>
            <button>Learn More</button>
        </section>
        </main>
       
        
      <Timeline />
      
      <Footer />
      <Chatbot />
      </>
     
  )
}

