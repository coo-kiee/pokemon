import { styled } from 'styled-components';

const Button = styled.button`
  position: fixed;
  z-index: 99;
  bottom: 1vh;
  right: 1vw;
  padding: 0px;
  border: none;
  background-color: ${(props) => props.theme.color.white};
`;

const TopBtn = () => {
  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Button type="button" onClick={scrollTop}>
      <img src="/images/top_btn.png" alt="topBtn" />
    </Button>
  );
};

export default TopBtn;
