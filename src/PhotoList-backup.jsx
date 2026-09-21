import React from 'react';
import Photo from "./Photo";

const PhotoList = (props) => {
    if (props.photos) {
      console.log('props.photos: ', props.photos);
    }
    return (
      <div class="photo-container">
        <h2>Results</h2>
        <ul>
          { 
            props.photos.hits.map(item => 
              <Photo 
                photo={item.previewURL} 
                key={item.id}
            />
          )}
        
            <li class="not-found">
                <h3>No Results Found</h3>
                <p>You search did not return any results. Please try again.</p>
            </li>
        </ul>
      </div>

    );
}

export default PhotoList;