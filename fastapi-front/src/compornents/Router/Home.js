import SlideHome from "../Home/slideHome";
import "../Home/home.css";

import PosterHome from "../Home/PosterHome";

export default function Home() {
  return (
    <div className="Home">
      
      <SlideHome />

      <PosterHome />

    </div>
  );
};