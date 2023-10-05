import React from "react";
import axios from "axios";
import Footer from "./compornents/Footer/footter";
import Navbar from "./compornents/Navbar/nav";

function App() {
	const [data, setData] = React.useState();
	const url = "http://127.0.0.1:8000";

	const GetData = () => {
		axios.get(url).then((res) => {
			setData(res.data);
		});
	};
	return (
		<div className="lessonApp stack-large">
      <Navbar />
        <div>ここに処理を書いていきます</div>
        {data ? <div>{data.Hello}</div> : <button onClick={GetData}>データを取得</button>}
      <Footer />
		</div>
	);
}

export default App;