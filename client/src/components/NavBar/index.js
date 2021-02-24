import React from 'react'
import { Navbar, Nav, Image } from 'react-bootstrap'

import Theme from '../../theme.js'

export default class NavBar extends React.Component {
  render = () => {

    const { auth } = this.props

    return (
      <Navbar bg="primary" expand="lg">
        <Navbar.Brand href="./">
          <Image style={style.image} src={require('../../img/movellasmall.png')} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href='./' style={style.navLink}>Móveis</Nav.Link>
            <Nav.Link href='./sobre' style={style.navLink}>Sobre</Nav.Link>
            <Nav.Link href='./contato' style={style.navLink}>Contato</Nav.Link>
            {auth && <Nav.Link href='/cadastrarmovel' style={style.navLink}>Cadastrar Móvel</Nav.Link>}
            {!auth && <Nav.Link href='./entrar' style={style.navLink}>Entrar</Nav.Link>}
            {!auth && <Nav.Link href='./criarconta' style={style.navLink}>Criar</Nav.Link>}
            {auth && <Nav.Link href='/' style={style.navLink} onClick={() => this.props.setAuth(null)}>Sair</Nav.Link>}
          </Nav>
          {auth &&
            <div><h3 style={style.text}>Bem vindo(a), {auth.usuario}</h3></div>
          }
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

const style = {
  image: {
    height: 80,
    width: 80,
  },
  navLink: {
    color: Theme.white,
  },
  text: {
    color: Theme.white,
  },
}
