import React from 'react'
import { Nav } from 'react-bootstrap'

import Theme from '../../theme.js'

export default class Footer extends React.Component {
  render = () => {

    return (
      <footer style={style.footer}>
        <Nav.Link style={style.navLink}>Copyright © 2020 Movella</Nav.Link>
      </footer>
    )
  }
}

const style = {
  footer: {
    width: '100%',
    padding: 25,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Theme.secondary,
  },
  navLink: {
    color: Theme.white,
  },
}
