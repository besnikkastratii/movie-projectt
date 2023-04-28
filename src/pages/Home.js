import React from 'react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import noImage from '../images/noImage.png';
import { Grid, Button } from '@material-ui/core'

function Home() {
  const [fetchedData, setfetchedData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [input, setInput] = useState("");
  const [search, setSearch] = useState("action")

  const fetchData = async (page) => {
    try {
      const { data } = await axios.get(`https://www.omdbapi.com/?apikey=dd6c9e75&s=${search}&page=${page}`);
      setfetchedData(data.Search);
      setTotalPages(Math.ceil(data.totalResults / 10));
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchData(currentPage);
  }, [search, currentPage])

  const inputHandler = (e) => {
    setInput(e.target.value);
  }

  const submitHandler = (e) => {
    e.preventDefault();
    setSearch(input);
    setCurrentPage(1);
  }

  const nextPageHandler = () => {
    setCurrentPage(prevPage => prevPage + 1);
  }

  const prevPageHandler = () => {
    setCurrentPage(prevPage => prevPage - 1);
  }

  const setPageHandler = (page) => {
    setCurrentPage(page);
  }

  return (
    <div className="main-container">
      <div className="header">
        <h4>Kerko Filma</h4>
      </div>
      <div className="search">
        <form onSubmit={submitHandler}>
          <input placeholder="Kerko Ketu" value={input} onChange={inputHandler} type="text" />
          <button> <i class="fas fa-search"></i></button>
        </form>
      </div>
      <Grid style={{ width: "100%" }} justify="center" container spacing={2}>
        {fetchedData &&
          fetchedData.map((item) => {
            return (
              <Grid item key={item.imdbID}>
                <div>
                  <div className="poster">
                    <Link to={`/details/${item.imdbID}`} >
                      <img src={item.Poster === "N/A" ? noImage : item.Poster} alt="" />
                    </Link>
                  </div>
                  <div className="title">
                    <Link to={`/details/${item.imdbID}`}>
                      <a href="">{item.Title}</a>
                    </Link>
                  </div>
                </div>
              </Grid>
            )
          })
        }
      </Grid>
      <div className="pagination">
  <Button disabled={currentPage === 1} onClick={prevPageHandler}>Prev</Button>
  {Array.from(Array(totalPages).keys()).map((page) => {
    // show only 5 pages before and after the current page
    if (page + 1 >= currentPage - 5 && page + 1 <= currentPage + 5) {
      return (
        <Button key={page} onClick={() => setPageHandler(page + 1)}>{page + 1}</Button>
      )
    }
    return null;
  })}
  <Button disabled={currentPage === totalPages} onClick={nextPageHandler}>Next</Button>
</div>

      <div className="footer">
        <p>About Us Not Implemeted</p>
      </div>
    </div>
  )
}

export default Home;
