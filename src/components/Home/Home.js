import React from "react";
import Navigation from '../Navigation/Navigation';
import Logo from '../Logo/Logo';
import ImageLinkForm from '../ImageLinkForm/ImageLinkForm'
import Rank from '../Rank/Rank'

function Home() {
    return (
        <div>
            <Navigation />
            <Logo />
            <Rank />
            <ImageLinkForm />
        </div>

    )
}


export default Home;
