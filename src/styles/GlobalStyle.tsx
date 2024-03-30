import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    #root {
        ${(props) => props.theme.common.full}
    }
`;

export default GlobalStyle;
