import { useEffect } from "react";
import api from "../../services/api";

export default function Room() {
  const key = "AIzaSyB-NR65UCbbhKPvEOFDw5ga-iNxJZlckBA";
  useEffect(() => {
    load();
  }, []);

  async function load() {
    const search = {
      part: "snippet",
      type: "video",
      maxResults: 10,
      q: "gatos",
    };
    const response = await api.get(`/search?key=${key}`, {
      params: search,
    });

    console.log(response);
  }

  return <div>oi</div>;
}
