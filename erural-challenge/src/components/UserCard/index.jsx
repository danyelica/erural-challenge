import { TextField, Typography } from "@mui/material";
import { useRef, useState } from "react";
import ColorButton from "../ColorButton";
import "./style.css";

export default function UserCard({ roomId }) {
  const username = useRef(`User${roomId}`);

  function saveUsername() {
    localStorage.setItem("username", username.current.value);
    return document.location.reload();
  }

  return (
    <section className='usercard'>
      <form className='usercard__container'>
        <Typography variant='h5'>Entrar como: {username.current}</Typography>
        <Typography variant='h6'>Ou insira abaixo</Typography>
        <input id='username' ref={username} />
        <ColorButton onClick={() => saveUsername()}>Salvar</ColorButton>
      </form>
    </section>
  );
}
