import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    #root {
        ${(props) => props.theme.size.full}
    }
`;

export default GlobalStyle;
