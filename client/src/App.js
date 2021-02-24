import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Moveis from './pages/Moveis'
import CadastrarMovel from './pages/CadastrarMovel'
import Entrar from './pages/Entrar'
import Erro from './pages/Erro'

import NavBar from './components/NavBar'
import Footer from './components/Footer'

import Theme from './theme.js'

const getCookie = name => {
  var cookieArray = document.cookie.split(';')
  for (var i = 0; i < cookieArray.length; i++) {
    var cookieKeyValuePair = cookieArray[i].split('=')
    if (name === cookieKeyValuePair[0].trim()) {
      return (cookieKeyValuePair[1])
    }
  }
  return null
}

export default class App extends React.Component {
  state = {
    auth: null,
  }

  componentDidMount = () => this.setState({ auth: JSON.parse(getCookie('auth')) })

  setAuth = d => {
    if (d === null) document.cookie = `${'auth'}=; expires=Thu, 01 Jan 1970 00:00:00 UTC;`
    else document.cookie = `${'auth'}=${JSON.stringify(d)}; max-age=60;`
    this.setState({ auth: d })
  }

  render = () => {

    return (
      <>
        <NavBar auth={this.state.auth} setAuth={this.setAuth} />
        <main className='container py-4'>
          <Switch>
            <Route exact path='/' component={Moveis} />
            <Route exact path='/cadastrarmovel' children={() => <CadastrarMovel auth={this.state.auth} />} />
            <Route path='/entrar' children={() => <Entrar setAuth={this.setAuth} />} />
            <Route exact component={Erro} />
          </Switch>
        </main>
        <Footer />
      </>
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
}
