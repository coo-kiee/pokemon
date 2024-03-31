const sort = {
  center: `
    display: flex;
    justify-content: center;
    align-items: center;
    `,
  centerColumn: `
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    `,
  textCenter: `
    text-align: center;
    `,
  flexWrap: `
    display: flex;
    flex-wrap: wrap;
    `,
};

const size = {
  full: `
    width: 100%;
    height: 100%;
    `,
};

const fontSize = {
  default: `
    font-size:16px;
    `,
};

const border = {
  default: `
    border: 1px solid #000000;
  `,
};

const color = {
  black: `#000000`,
  blue: `#000000`,
  red: `#ff0000`,
};

const theme = {
  sort,
  size,
  fontSize,
  border,
  color,
};

export default theme;
