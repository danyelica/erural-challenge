import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Room from "./pages/Room";

export default function MainRoutes() {
  const [roomId, setRoomId] = useState(null);
  const [room, setRoom] = useState("");

  return (
    <Routes>
      <Route
        path='/'
        element={
          <Home
            room={room}
            setRoom={setRoom}
            roomId={roomId}
            setRoomId={setRoomId}
          />
        }
      />
      <Route path='/room' element={<Room room={room} roomId={roomId} />} />
    </Routes>
  );
}
