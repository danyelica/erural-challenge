import { useEffect, useState } from "react";
import "./style.css";
import api from "../../services/api";

export default function Home() {
  useEffect(() => {
    load();
  }, []);

  async function load() {
    const arr_search = {
      part: "snippet",
      type: "video",
      maxResults: 10,
      q: "gatos",
    };
    const response = await api.get(
      "/search?key=AIzaSyB-NR65UCbbhKPvEOFDw5ga-iNxJZlckBA",
      { params: arr_search }
    );

    console.log(response);
  }

  return <div className='App'>opa</div>;
}
