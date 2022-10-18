import { Link } from "react-router-dom";
import "./style.css";

export default function Home() {
  const roomId = Math.floor(Math.random() * 1000);
  const room = `/room?id=${roomId}`;

  return (
    <div className='App'>
      <Link to={room}>
        <button>Criar sala</button>
      </Link>
    </div>
  );
}
