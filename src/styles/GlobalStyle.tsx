import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    #root {
        ${(props) => props.theme.size.vFull}
    }
`;

export default GlobalStyle;
