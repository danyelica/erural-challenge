import { Avatar, Card, CardContent, TextField } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import ColorButton from "../../components/ColorButton";
import UserCard from "../../components/UserCard";
import api from "../../services/api";
import "./style.css";

export default function Room({ room, roomId }) {
  const userName = localStorage.getItem("username");
  const searchList = JSON.parse(localStorage.getItem("searchList"));
  const key = "AIzaSyB-NR65UCbbhKPvEOFDw5ga-iNxJZlckBA";
  const [videoLink, setVideoLink] = useState(
    "https://www.youtube.com/embed/CDzG2RaZORo"
  );
  const searchInput = useRef("");

  async function loadSearchList() {
    const search = {
      part: "snippet",
      type: "video",
      maxResults: 10,
      q: searchInput.current.value,
    };

    const { data } = await api.get(`/search?key=${key}`, {
      params: search,
    });

    localStorage.setItem("searchList", JSON.stringify(data.items));
    return document.location.reload();
  }

  function handleCopy() {
    let copyingText = document.querySelector("#room-url");
    copyingText.select();
    copyingText.setSelectionRange(0, 99999);
    document.execCommand("copy");
  }

  function handleSearch() {
    const inputValue = searchInput.current.value;
    if (!inputValue) return;

    if (inputValue.includes("http") || inputValue.includes("www.")) {
      if (inputValue.includes("embed")) {
        return setVideoLink(inputValue);
      }

      const index = inputValue.indexOf("=");
      return setVideoLink(
        "https://www.youtube.com/embed/" + inputValue.slice(index + 1)
      );
    }

    return loadSearchList();
  }

  function handleChangeVideo(videoId) {
    return setVideoLink("https://www.youtube.com/embed/" + videoId);
  }

  return (
    <section className='room'>
      {!userName ? (
        <UserCard roomId={roomId} />
      ) : (
        <div>
          <Card sx={{ display: "flex" }}>
            <iframe
              width='888'
              height='500'
              src={videoLink}
              title='YouTube video player'
              frameBorder='0'
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
              allowFullScreen
            ></iframe>
            <div className='room__text'>
              <div className='text__form'>
                <TextField
                  id='room-url'
                  value={`http://127.0.0.1:5173${room}`}
                  variant='outlined'
                />
                <ColorButton
                  sx={{ margin: "10px" }}
                  onClick={() => handleCopy()}
                >
                  Copiar link da sala
                </ColorButton>
              </div>
              <div>
                <input
                  id='search-video'
                  ref={searchInput}
                  placeholder='digite uma palavra ou cole um link do youtube'
                  className='form__input'
                />
                <ColorButton
                  sx={{ margin: "10px" }}
                  onClick={() => handleSearch()}
                >
                  Pesquisar
                </ColorButton>
              </div>
            </div>
          </Card>
          <div className='bottom__section'>
            <Card
              variant='outlined'
              sx={{
                margin: "20px",
                width: "100px",
              }}
            >
              <CardContent>
                <Avatar sx={{ margin: 0 }} />
                {userName}
              </CardContent>
            </Card>

            <h2 className='search__title'>Resultados da pesquisa:</h2>

            {searchList &&
              searchList.map((video) => (
                <div
                  key={video.id.videoId}
                  className='search__container'
                  onClick={() => handleChangeVideo(video.id.videoId)}
                >
                  <img src={video.snippet.thumbnails.medium.url} />
                  <h4>{video.snippet.title}</h4>
                </div>
              ))}
          </div>
        </div>
      )}
    </section>
  );
}
