import { Avatar, Card, CardContent, TextField } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";
import ColorButton from "../../components/ColorButton";
import UserCard from "../../components/UserCard";
import api from "../../services/api";
import "./style.css";

export default function Room({ room, roomId }) {
  const userName = localStorage.getItem("username");
  const key = "AIzaSyB-NR65UCbbhKPvEOFDw5ga-iNxJZlckBA";
  const [seachKey, setSearchKey] = useState("gatos");
  const [list, setList] = useState([]);

  const theme = useTheme();

  /*useEffect(() => {
    loadList();
  }, []);*/

  async function loadList() {
    const search = {
      part: "snippet",
      type: "video",
      maxResults: 10,
      q: seachKey,
    };

    const { data } = await api.get(`/search?key=${key}`, {
      params: search,
    });

    return setList(data.items);
  }

  function handleCopy() {
    let copyingText = document.querySelector("#room-url");
    copyingText.select();
    copyingText.setSelectionRange(0, 99999);
    document.execCommand("copy");
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
              src='https://www.youtube.com/embed/CDzG2RaZORo'
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
                <TextField
                  id='search-video'
                  label='digite uma palavra ou cole o link do youtube'
                  variant='outlined'
                  sx={{ width: "90%" }}
                />
                <ColorButton
                  sx={{ margin: "10px" }}
                  onClick={() => handleCopy()}
                >
                  Pesquisar
                </ColorButton>
              </div>
            </div>
          </Card>
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
        </div>
      )}
    </section>
  );
}
