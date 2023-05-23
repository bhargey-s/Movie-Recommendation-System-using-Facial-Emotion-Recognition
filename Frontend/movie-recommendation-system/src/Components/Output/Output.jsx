import { React, useState, useRef, useEffect, Fragment } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Row from './Row';
import Mapping from '../../Constants/Mapping';
import axios from 'axios';
import "./output-stylesheet.css"

function Output() {
  const location = useLocation();
  const state = location.state || { emotion: null };
  const predictedEmotion = state.emotion;
  const name = state.name;
  // const predictedEmotion = "angry";

  const [genres, setGenres] = useState([]);

  useEffect(() => {
    setGenres(Mapping[predictedEmotion] || []);
  }, [])
  // <nav>
  //   <h1 style={{ color: "red", fontFamily: 'Netflix Sans Bold' }}>MovieSense</h1>
  // </nav>

  return (
    <Fragment>
      <div className="output">
        <div>
          <h1 style={{ marginBottom: "5vh" }}>
            {name}, I think you are feeling <span style={{ fontFamily: "Netflix Sans Medium", color: "gray" }}>{predictedEmotion} </span>right now
          </h1>
          <div>
            {
              genres.map((genre, i) => {
                return (
                  <Row
                    key={i}
                    title={genre.title}
                    description={genre.description}
                  ></Row>
                )
              })
            }
          </div>
        </div>
      </div>
      </Fragment>
      )
}

      export default Output