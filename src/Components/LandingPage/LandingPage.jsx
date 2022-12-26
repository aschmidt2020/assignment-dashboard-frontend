import React from 'react';
import StudentView from '../../Documents/student-screenshot.png';
import EducatorView from '../../Documents/educator-screenshot.png';
import LandingPageScreenshot from '../../Documents/landing-page.png'
import './LandingPage.css';
import LoginForm from "../LoginForm/LoginForm";
import RegistrationForm from "../RegistrationForm/RegistrationForm";

const LandingPage = (props) => {
    return (
        <div className='landing-page-background' style={{ 'textAlign': 'center', 'marginTop': '3em', 'height': '90vh', 'width': '100vw' }}>
            <div className='row'>
                <div className='col' style={{ 'marginTop': '18em' }}>
                    <h1>Assignment Dashboard</h1>
                    <p>Like an online agenda...but better.</p>
                    <span><LoginForm /> <RegistrationForm /> </span>
                </div>
                <div className='col' style={{ 'marginTop': '10em', 'marginRight': '4em' }}>
                    <div id="carouselExampleIndicators" className="carousel carousel-dark slide" data-bs-ride="carousel">
                        <div className="carousel-indicators">
                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                        </div>
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                <img src={EducatorView} className="d-block w-100" alt="assignment dashboard educator view" />
                            </div>
                            <div className="carousel-item">
                                <img src={StudentView} className="d-block w-100" alt="assignment dashboard student view" />
                            </div>
                            <div className="carousel-item">
                                <img src={LandingPageScreenshot} className="d-block w-100" alt="assignment dashboard landing page" />
                            </div>
                        </div>
                        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LandingPage;