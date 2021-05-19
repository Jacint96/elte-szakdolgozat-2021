import React from 'react'
import { Link } from 'react-router-dom'
import Cookies from 'universal-cookie'
import { Helmet } from 'react-helmet'

import styles from './Layout.module.scss'

class Layout extends React.PureComponent {
  constructor() {
    super()
    this.state = {
      loggedIn: false
    }
    this.cookies = new Cookies()
    this.handleLogout = this.handleLogout.bind(this)
  }

  componentDidMount() {
    this.setState({
      loggedIn: this.cookies.get('token') ? true : false
    })
  }

  handleLogout() {
    this.cookies.remove('token', { path: '/' })
    window.location.href = '/'
  }

  render() {
    const { children, title, balance } = this.props
    const { loggedIn } = this.state
    return (
      <div className={styles.Layout}>
        <Helmet>
          <title>{title ? `${title} | Blackjack` : 'Blackjack'}</title>
          <meta
            property="og:title"
            content={title ? `${title} | Blackjack` : 'Blackjack'}
          />
          <meta
            property="description"
            content="Play Blackjack online"
          />
          <meta
            property="og:description"
            content="Play Blackjack online"
          />
          <meta property="og:type" content="website" />
        </Helmet>
        <div className={styles.PageContent}>
          <div className={styles.Nav}>
            {loggedIn && (
              <>
                <Link to="/" className={styles.Home}>
                  Blackjack
                </Link>
                <div className={styles.ProfileControls}>
                  <p>Balance: {balance}</p>
                  <button onClick={this.handleLogout}>Log out</button>
                </div>
              </>
            )}
          </div>
          {children}
        </div>
      </div>
    )
  }
}

export default Layout