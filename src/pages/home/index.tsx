import * as S from 'styles/home';

// URL
import { PAGE_URL } from 'consts/common';

const Home = () => {
  return (
    <S.HomeContainer>
      <S.MenuNav to={PAGE_URL.POKE_DEX}>도감</S.MenuNav>
    </S.HomeContainer>
  );
};

export default Home;
