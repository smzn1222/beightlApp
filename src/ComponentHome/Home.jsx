import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="Home">
      <h1>Beightlyouch</h1>
      <ul>
        <li>
          <Link to="/Chat">BeightlGPT</Link>
        </li>
        <li>
          <Link target="_blank" to="https://beightlyouch.com/">
            公式ブログ（外部リンク）
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Home;
