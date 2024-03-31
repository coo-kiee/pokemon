import { Link } from 'react-router-dom';

// URL
import { PAGE_URL } from 'consts/common';

const Home = () => {
  return (
    <>
      <div>HOME</div>
      <Link to={PAGE_URL.POKE_DEX}>PokeDex</Link>
    </>
  );
};

export default Home;
