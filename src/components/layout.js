import * as React from "react"
import { Link } from "gatsby"
import Helmet from 'react-helmet';
import Toggle from './Toggle'
// import moon from '../images/moon.png'
// import sun from '../images/sun.png'
import { DEFAULT_CONFIG } from './Config'

import * as styles from './Layout.module.css';

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath
  let header

  const [state, setState] = React.useState({theme: null});
  // this.state = {
  //   theme: null,
  // };

  // console.log('DEFAULT_CONFIG =>', DEFAULT_CONFIG);
  const { colorMode } = DEFAULT_CONFIG;
  const { switchConfig } = colorMode;
  // console.log('switchConfig =>', switchConfig);

  React.useEffect(() => {
    setState({ theme: window.__theme });

    window.__onThemeChange = () => {
      setState({ theme: window.__theme });
    };
  }, []);

  if (isRootPath) {
    header = (
      <h1 className="main-heading">
        <Link to="/">{title}</Link>
      </h1>
    )
  } else {
    header = (
      <Link className="header-link-home" to="/">
        {title}
      </Link>
    )
  }

  return (
    <div className="global-wrapper"
      style={{
        color: 'var(--textNormal)',
        background: 'var(--bg)',
        transition: 'color 0.2s ease-out, background 0.2s ease-out',
        minHeight: '100vh',
      }}
      data-is-root-path={isRootPath}
    >
      <Helmet
        meta={[
          {
            name: 'theme-color',
            content: state.theme === 'light' ? '#ffa8c5' : '#282c35',
          },
        ]}
      />
      <header className={styles.globalHeader}>
        {header}
        {state.theme !== null ? (
          <Toggle
            checked={state.theme === 'dark'}
            switchConfig={switchConfig}
            onChange={e =>
              window.__setPreferredTheme(
                e.target.checked ? 'dark' : 'light'
              )
            }
          />) : (
          <div style={{ height: '24px' }} />
        )}
      </header>

      <main>{children}</main>
      <footer>
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.com">Gatsby</a>
      </footer>
    </div>
  )
}

export default Layout
