import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  html,
  body,
  div,
  span,
  applet,
  object,
  iframe,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  blockquote,
  pre,
  a,
  abbr,
  acronym,
  address,
  big,
  cite,
  code,
  del,
  dfn,
  em,
  img,
  ins,
  kbd,
  q,
  s,
  samp,
  small,
  strike,
  strong,
  sub,
  sup,
  tt,
  var,
  b,
  u,
  i,
  center,
  dl,
  dt,
  dd,
  ol,
  ul,
  li,
  fieldset,
  form,
  label,
  legend,
  table,
  caption,
  tbody,
  tfoot,
  thead,
  tr,
  th,
  td,
  article,
  aside,
  canvas,
  details,
  embed,
  figure,
  figcaption,
  footer,
  header,
  hgroup,
  menu,
  nav,
  output,
  ruby,
  section,
  summary,
  time,
  mark,
  audio,
  video {
      margin: 0;
      padding: 0;
      border: 0;
      font-size: 100%;
      font: inherit;
      vertical-align: baseline;
  }

  /* HTML5 display-role reset for older browsers */
  article,
  aside,
  details,
  figcaption,
  figure,
  footer,
  header,
  hgroup,
  menu,
  nav,
  section {
      display: block;
  }

  body {
      line-height: 1;
  }

  ol,
  ul {
      list-style: none;
  }

  blockquote,
  q {
      quotes: none;
  }

  blockquote:before,
  blockquote:after,
  q:before,
  q:after {
      content: "";
      content: none;
  }

  table {
      border-collapse: collapse;
      border-spacing: 0;
  }
  
  *, *:before, *:after {
    box-sizing: border-box;
  }
  
  /* main */

  html,
  body,
  #__next {
      height: 100%;
  }

  /* fonts */

  @font-face {
    font-family: "IntegralCF Bold";
    src: url("/static/fonts/IntegralCF-Bold.woff2");
  }

  body {
    font-family: 'DM Sans', sans-serif;
  }

  h1, h2 {
    font-family: 'IntegralCF Bold', sans-serif;
  }

  body,
  span,
  input,
  button,
  textarea,
  select,
  option {
    line-height: 1.25;
  }

  a {
    text-decoration: none;
    transition: all 0.2s;
    cursor: pointer;

    :hover {
        filter: brightness(0.8);
    }
  }

  p,
  a, 
  span, 
  input, 
  button, 
  textarea, 
  select, 
  option, 
  label, 
  li, 
  h1, 
  h2, 
  h3, 
  h4, 
  h5, 
  h6 {  
    letter-spacing: 0.05rem;
  }
`;

export default GlobalStyle;
