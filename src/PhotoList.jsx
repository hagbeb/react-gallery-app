import Photo from "./Photo";
import NoResults from "./NoResults";
import  { useParams } from 'react-router-dom';

const PhotoList = (props) => {
  console.log('starting PhotoList');
  // variable to store user's search term if one was passed in
  let { query } = useParams();
  // variable to store photos array so we don't have to repeat return statement
  let photosToDisplay;
  // check if one of the default static props were received.
  // If so, save to photosToDisplay
  if (props.photos) {
    photosToDisplay = props.photos;
    console.log('photosToDisplay static: ', photosToDisplay);
  // check if searchedPhotos prop was received, meaning the user made a search
  } else if (props.searchedPhotos) {
    // if so, save the photos array that matches the query to photosToDisplay.
    // the values of searchedPhotos are photos arrays; the keys are search queries
    photosToDisplay = props.searchedPhotos[query];
    console.log('photosToDisplay user search: ', photosToDisplay);
  } else {
    //set photosToDisplay to empty array, as props may either empty be array or undefined
    // ...so setting to empty array ensures consistency for use in condition below
    photosToDisplay = [];
  }
  // check if any photos were received in props, via length of photosToDisplay array.
  // If so, return the results in a <Photo> component
  if (photosToDisplay.length != 0) {
    return (
    <div className="photo-container">
      <h2>{props.pageTitle}</h2>
      <ul>
        { 
          photosToDisplay.map(item => 
            <Photo 
              photo={item.previewURL} 
              key={item.id}
            />
        )}
      </ul>    
    </div>
    );
  // if no props were received, then show display not found message
  } else {
    return (
      <NoResults key={query} />
    );
  };     
}

export default PhotoList;