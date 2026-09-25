import { useState } from 'react';

const NoResults = () => {
    console.log('running NoResults');
    // state to record whether we are waiting for results. true = show spinning loader
    const [waiting, setWaiting] = useState(true);
    // function to display message if no results are found
    function displayNotFound() {
        // set waiting to false, which will cause re-render, and show second return ...
        // ... statement which is the Not Found message, rather than spinning loader
        setWaiting(false);
        console.log('running displayNotFound');
    }
    // after 2 seconds, run function to change state & show Not Found message.
    setTimeout(displayNotFound, 2000);
    // while waiting is true, show the spinning loader icon
    if (waiting == true) {
        return (
            <div id="loader-parent">
                <div className="spinner-loader"></div>
            </div>
        );
    // after waiting set to false, show Not Found message
    } else {
        return (
            <div className="not-found">
                <h1>No Matches Found</h1>
                <p>Sorry, your search did not return any results. Please try again.</p>
            </div>
        );
    }
}

export default NoResults