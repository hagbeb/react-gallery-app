import React from 'react';
import Photo from "./Photo";

const PhotoList = (props) => {
  // function to display message if no results are found
  function displayNotFound() {
      return (
        <li class="not-found">
            <h3>No Matches Found</h3>
            <p>Sorry, your search did not return any results. Please try again.</p>
        </li>
    )
  }
  // check if props were received. If so, return the results in a <Photo> component
    if (props.photos) {
      console.log('props.photos: ', props.photos);
      return (
      <div class="photo-container">
        <h2>{props.pageTitle}</h2>
        <ul>
          { 
            props.photos.hits.map(item => 
              <Photo 
                photo={item.previewURL} 
                key={item.id}
            />
          )}
        </ul>    
      </div>

      );
      // if not, wait 3 seconds and then show the 'Not found' message
    } else {
      setInterval(displayNotFound, 3000);
      // while waiting, show the spinning loader icon
      return (
        <div id="loader-parent">
          <div class="spinner-loader"></div>
        </div>
      )};
}

export default PhotoList;