import pic from "../../images/rumika.jpg";
import "./PosterHome.css";

export default function PosterHome() {
  
  const posters = [];

  for (let i = 1; i <= 9; i++) {
    posters.push(
      <div className="PosterHome" key={i}>
        <div className="poster-img">
          <img src={pic} alt="picture" />
        </div>

        <div className="poster-title">
          <p>text Lesson12345</p>
        </div>

        <div className="poster-date">
          <p>5 days ago</p>
        </div>
      </div>
    )
  }
  return (
    <div className="Poster-container">
      { posters }
    </div>
  );
};