import { useEffect } from "react";
import { Link } from "react-router-dom";
import ColorButton from "../../components/ColorButton";
import "./style.css";

export default function Home({ room, setRoom, roomId, setRoomId }) {
  useEffect(() => {
    setRoomId(Math.floor(Math.random() * 1000));
  }, []);

  useEffect(() => {
    setRoom(`/room?id=${roomId}`);
  }, [roomId]);

  return (
    <section className='home'>
      <Link to={room} className='home__button'>
        <ColorButton variant='contained'>Criar sala</ColorButton>
      </Link>
    </section>
  );
}
