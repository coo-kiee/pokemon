import { styled, keyframes } from 'styled-components';

const spinner = keyframes`
  from {transform: rotate(0deg); }
  to {transform: rotate(360deg); }
`;

export const SpinnerLayout = styled.div<{ $isPopup?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  ${(props) => (props.$isPopup ? props.theme.size.vFull : props.theme.size.full)}
`;

export const PokeballOuter = styled(SpinnerLayout)`
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  border: 2px solid transparent;
  border-color: #ff4662;
  animation: ${spinner} 1s linear infinite;
`;

export const PokeballInnerTop = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 50%;
  border-bottom: 1px solid transparent;
  border-color: #000000;
  background-color: #ff4662;
`;

export const PokeballOpenner = styled.div`
  position: absolute;
  box-sizing: border-box;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 1px solid transparent;
  border-color: #000000;
  background-color: #fff;
  z-index: 1;
`;
