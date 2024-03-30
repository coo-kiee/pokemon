import { FC } from 'react';

// Style
import * as S from 'styles/Spinner';

const Spinner: FC = () => {
  return (
    <S.SpinnerLayout>
      <S.PokeballOuter>
        <S.PokeballInnerTop />
        <S.PokeballOpenner />
      </S.PokeballOuter>
    </S.SpinnerLayout>
  );
};

export default Spinner;
