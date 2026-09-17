import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import { default as key } from './config.js'

// react router imports
import { Routes, Route, Navigate } from 'react-router-dom';

// import components
import PhotoList from "./PhotoList";
import Nav from "./Nav";
import Search from "./Search";

function App() {
  const [count, setCount] = useState(0);
  // state to store data retreived from Pixabay user searches
  const [photos, storePhotos] = useState();
  // states to store Pixabay photos for static pages, so they only need to be stored once
  const [catPhotos, storeCatPhotos] = useState();
  const [dogPhotos, storeDogPhotos] = useState();
  const [computerPhotos, storeComputerPhotos] = useState();

  // function to handle fetch requests. Pass in query entered by user
  async function fetchData(userQuery) {
    // build query to use in fecth
    const fetchQuery = `https://pixabay.com/api/?key=${key}&q=${userQuery}&image_type=photo`;

    // fetch images
    try {
      let response = await fetch(fetchQuery);
      // if the response is not ok
      if (!response.ok) {
        throw new Error (`Error fetching. Status: ${response.status}`);
      // if the response is OK
      } else {
        // convert to JSON, then save to responseData
        let responseData = await response.json();
        console.log(responseData);
        // store the response from Pixabay in the relevant state
        if (userQuery === 'cats') {
          storeCatPhotos(responseData);

        } else if (userQuery === 'dogs') {
          storeDogPhotos(responseData);

        } else if (userQuery === 'computers') {
          storeComputerPhotos(responseData);

        } else {
          storePhotos(responseData);
          console.log(photos);
        }
      }
    } catch(error) {
      console.log(error);
    }
  }

  // fetch images for the static pages.
  fetchData('cats');
  fetchData('dogs');
  fetchData('computers');

  return (
    <>
      <Search />
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
        <Route path="/search/:query" element={<PhotoList />} />
      </Routes>
      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        <div>
          <h1>Get started</h1>
          <p>
            Edit <code>src/App.jsx</code> and save to test <code>HMR</code>
          </p>
        </div>
        <button
          type="button"
          className="counter"
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count}
        </button>
      </section>

      <div className="ticks"></div>

      <section id="next-steps">
        <div id="docs">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#documentation-icon"></use>
          </svg>
          <h2>Documentation</h2>
          <p>Your questions, answered</p>
          <ul>
            <li>
              <a href="https://vite.dev/" target="_blank">
                <img className="logo" src={viteLogo} alt="" />
                Explore Vite
              </a>
            </li>
            <li>
              <a href="https://react.dev/" target="_blank">
                <img className="button-icon" src={reactLogo} alt="" />
                Learn more
              </a>
            </li>
          </ul>
        </div>
        <div id="social">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#social-icon"></use>
          </svg>
          <h2>Connect with us</h2>
          <p>Join the Vite community</p>
          <ul>
            <li>
              <a href="https://github.com/vitejs/vite" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#github-icon"></use>
                </svg>
                GitHub
              </a>
            </li>
            <li>
              <a href="https://chat.vite.dev/" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#discord-icon"></use>
                </svg>
                Discord
              </a>
            </li>
            <li>
              <a href="https://x.com/vite_js" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#x-icon"></use>
                </svg>
                X.com
              </a>
            </li>
            <li>
              <a href="https://bsky.app/profile/vite.dev" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#bluesky-icon"></use>
                </svg>
                Bluesky
              </a>
            </li>
          </ul>
        </div>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App
