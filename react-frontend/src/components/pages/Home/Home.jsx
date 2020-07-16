import React from "react";
import EmailBuilder from "../../EmailBuilder/EmailBuilder";
import './home.scss';

const Home = () => {
    return (
        <main className="home-container">
            <h1 className="home-container__heading">CityAxess - Email Builder</h1>
            <EmailBuilder />
        </main>
    );
};

export default Home;
