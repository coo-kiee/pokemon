import { AxiosError } from 'axios';
import { PAGE_URL } from 'consts/common';

// Sytle
import * as S from 'styles/error';

interface IError {
  error: unknown;
  resetErrorBoundary: (...args: unknown[]) => void;
}
const ErrorFallback = ({ error, resetErrorBoundary }: IError) => {
  const err = error as AxiosError;
  const is404 = err.response?.status === 404;

  const goHome = () => {
    window.location.href = PAGE_URL.HOEM;
  };

  const showMsg = is404 ? '해당 포켓몬 정보가 없습니다.' : '서버요청에 실패했습니다! 잠시후 다시 시작해주세요.';
  const btnTxt = is404 ? '홈으로' : '다시시도';
  const onClick = is404 ? goHome : resetErrorBoundary;

  return (
    <S.ErrorContainer>
      <S.ErrorText>{showMsg}</S.ErrorText>
      <button type="button" onClick={onClick}>
        {btnTxt}
      </button>
    </S.ErrorContainer>
  );
};

export default ErrorFallback;
