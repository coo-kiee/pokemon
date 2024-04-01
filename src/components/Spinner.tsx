// Style
import * as S from 'styles/spinner';

interface ISpinner {
  isPopup?: boolean;
}
const Spinner = ({ isPopup }: ISpinner) => {
  return (
    <S.SpinnerLayout $isPopup={isPopup}>
      <S.PokeballOuter>
        <S.PokeballInnerTop />
        <S.PokeballOpenner />
      </S.PokeballOuter>
    </S.SpinnerLayout>
  );
};

export default Spinner;
