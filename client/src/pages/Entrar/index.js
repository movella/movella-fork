import React from 'react'
import { Button, FormControl, Form } from 'react-bootstrap'

export default class Entrar extends React.Component {
  state = {
    email: '',
    senha: '',
  }

  setEmail = ({ target }) => this.setState({ email: target.value })

  setSenha = ({ target }) => this.setState({ senha: target.value })

  request = async () => {

    const response = await fetch('/api/login', {
      method: 'post',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        email: this.state.email,
        senha: this.state.senha,
      }),
    })

    const body = await response.json()

    console.log(body)

    if (response.status === 200) {
      const { email, usuario, id, foto } = body.data
      this.props.setAuth({ usuario, email, id, foto })
      window.location = '/'
    } else {
      alert(body.msg)
    }

  }

  render = () => {

    return (
      <>
        <h1 className='mb-3'>Entrar</h1>

        <Form>

          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control type='email' value={this.state.email} onChange={this.setEmail} />
          </Form.Group>

          <Form.Group>
            <Form.Label>Senha</Form.Label>
            <Form.Control type='password' value={this.state.senha} onChange={this.setSenha} />
          </Form.Group>

          <Button onClick={this.request}>Entrar</Button>

        </Form>
      </>
    )

  }
}
