import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const Search = ({makeSearch}) => {
  // create ref for users search in form
  const search = useRef();
  // create and store a useNavigate function using the useNavigate hook. 
  let navigate = useNavigate();
  // function for form submit
  async function handleSubmit(e) {
    // prevent auto-refresh
    e.preventDefault();
    // store the users search value
    let userSearch = search.current.value;
    // create the path to redirect to based on the user's search query
    let path = `./search/${userSearch}`;
    // redirect to page based on user's search to display results
    navigate(path);
    // call the fetchData function in App.jsx that was passed as 'makeSearch' prop.
    // pass in the users search in the form that as stored in 'userSearch'
    await makeSearch(userSearch);
  }
    return (
      <form className="search-form" onSubmit={handleSubmit} >
        <input type="search" name="search" placeholder="Search" ref={search} required/>
        <button type="submit" className="search-button">
          <svg fill="#fff" height="24" viewBox="0 0 23 23" width="24" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
            <path d="M0 0h24v24H0z" fill="none"/>
          </svg>
        </button>
      </form>
    );
}

export default Search;