import React, { useState } from "react";
import axios from "axios";

function Sample() {
  const [message1, setMessage1] = useState("");
  const [message2, setMessage2] = useState("");

  const handleClick = () => {
    axios
      .post("http://localhost:8000/", {
        param1: "hoge",
        param2: "fuga"
      })
      .then((res) => {
        setMessage1(res.data.param1);
        setMessage2(res.data.param2);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <button onClick={handleClick}>
        POST
      </button>
      <p>message1={message1}</p>
      <p>message2={message2}</p>
    </div>
  );
}

export default Sample;