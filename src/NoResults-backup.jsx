import React, { useState } from 'react';

const NoResults = () => {
    console.log('running NoResults');

    const [waiting, setWaiting] = useState(true);

    console.log('waiting after creation: ', waiting);

    // function to display message if no results are found
    function displayNotFound() {
    setWaiting(false);
        console.log('running displayNotFound');

    }
    setTimeout(displayNotFound, 3000);
    // while waiting, show the spinning loader icon
    if (waiting == true) {
        return (
            <div id="loader-parent">
                <div class="spinner-loader"></div>
            </div>
        );
    } else {
        return (
            <div class="not-found">
                <h3>No Matches Found</h3>
                <p>Sorry, your search did not return any results. Please try again.</p>
            </div>
        );
    }
}

export default NoResults