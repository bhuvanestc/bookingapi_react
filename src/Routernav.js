import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, Navigate, useParams } from "react-router-dom";
import Header from './Header';
import BookingList from './BookingList';
import CancelBooking from './CancelBooking';
const RouterNav = () => {
    return (
        <div>
            <Router>
                <Header />
                <Routes>
                    <Route exact path='/' element={<Home />} />

                    <Route path='/booking' element={<BookingList />} />
                    <Route path='/home' element={<Home />} />
                    <Route path='/about' element={<About />} />
                    <Route path='/cancel' element={<CancelBooking />} />
                    <Route path='*' element={<NotFound />} />

                </Routes>

            </Router>
        </div>
    );
};


const Home = () => {
const navigate = useNavigate();

    return (<div>
        <h1>Welcome to Vaccination Booking Application. </h1>
        <a href='#' className='btn btn-outline-danger'onClick={ ()=> navigate(-1)}>Back</a>
        <a href='#' className='btn btn-outline-info'onClick={ ()=> navigate('/about')}>About</a>
    </div>)
}
const About = () => <h1>This is a Vaccination Booking Application using React.</h1>

const DetailsBooking = () => {
    const params = useParams();


    return (
        <div>
            <h3>Details</h3>
            <p>ID: {params.id}</p>
        </div>
    )
};

const NotFound = () => <h1>404</h1>;

export default RouterNav;
