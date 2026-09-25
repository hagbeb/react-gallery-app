import { useState, useEffect } from 'react';
import './App.css'
import { default as key } from './config.js'

// react router imports
import { Routes, Route, Navigate } from 'react-router-dom';

// import components
import PhotoList from "./PhotoList";
import Nav from "./Nav";
import Search from "./Search";
import NotFound from "./NotFound";

function App() {
  // state to store data retreived from Pixabay user searches
  const [userPhotos, setUserPhotos] = useState();
  // states to store Pixabay photos for static pages, so they only need to be stored once
  const [catPhotos, setCatPhotos] = useState();
  const [dogPhotos, setDogPhotos] = useState();
  const [computerPhotos, setComputerPhotos] = useState();
  // function to handle fetch requests. Pass in query entered by user
  async function fetchData(userQuery) {
    // build query to use in fecth
    const fetchQuery = `https://pixabay.com/api/?key=${key}&q=${userQuery}&image_type=photo`;
    // fetch images
    try {
      let response = await fetch(fetchQuery);
      // if the response is not ok, throw error
      if (!response.ok) {
        throw new Error (`Error fetching. Status: ${response.status}`);
      // if the response is OK
      } else {
        // convert to JSON, then return
        let responseData = await response.json();
        // update the appropriate state, depending on what was passed in
        // .hits is the array of photos
        if (userQuery === 'cats') {
          setCatPhotos(responseData.hits);
        } else if (userQuery === 'dogs') {
          setDogPhotos(responseData.hits);
        } else if (userQuery === 'computers') {
          setComputerPhotos(responseData.hits);
        // else if the parameter was a user search query
        } else {
          // create a new object, from the existing state, then adding a new property...
          // ... with user query and the returned object

          let newSearchObject = { ...userPhotos };
          newSearchObject[userQuery] = responseData.hits;
          setUserPhotos(newSearchObject);
        }
      }
    } catch(error) {
      console.log(error);
    }
  }
  // fetch images for the static pages. Run in useEffect so function only runs once
  useEffect(() => {
    console.log('useEffect ran');
    async function staticPhotos() {
      console.log('running staticPhotos');
      // use fetchData to get images. Save them to the relevant states.
      fetchData('cats');
      fetchData('dogs');
      fetchData('computers');
    }
      staticPhotos();
       // Empty dependency array so useEffect only runs once
    }, []);

  return (
    <>
      <Search makeSearch={fetchData} />
      <Nav />
      <Routes>
        <Route path="/">
          {/* redirect from home page to first static route*/}
          <Route index element={<Navigate replace={true} to="cats" />} />
        </Route>
        {/* static routes */}
        <Route path="/cats" element={<PhotoList pageTitle='Cats' photos={catPhotos}/>} />
        <Route path="/dogs" element={<PhotoList pageTitle='Dogs' photos={dogPhotos}/>} />
        <Route path="/computers" element={<PhotoList pageTitle='Computers' photos={computerPhotos}/>} />
        {/* search route */}
        <Route path="/search/:query" element={<PhotoList pageTitle='Your search results:' searchedPhotos={userPhotos} />} />
        <Route path="*" element={<NotFound />}/>
      </Routes>
    </>
  )
}

export default App
