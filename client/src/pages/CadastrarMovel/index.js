import React from 'react'
import { Button, FormControl, Form } from 'react-bootstrap'
import { Redirect } from 'react-router-dom'

export default class CadastrarMovel extends React.Component {
  state = {
    nome: '',
    redirect: false,
  }

  setNome = ({ target }) => this.setState({ nome: target.value })

  setDescricao = ({ target }) => this.setState({ descricao: target.value })

  setValorMes = ({ target }) => this.setState({ valorMes: target.value })

  setAltura = ({ target }) => this.setState({ altura: target.value })

  setLargura = ({ target }) => this.setState({ largura: target.value })

  setEspessura = ({ target }) => this.setState({ espessura: target.value })

  componentDidMount = async () => {

    if (this.props.auth == null) this.setState({ redirect: true })

  }

  request = async () => {

    const { nome, descricao, valorMes, altura, largura, espessura } = this.state
    const usuarioId = this.props.auth.id

    const response = await fetch('/api/moveis/create', {
      method: 'post',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        nome, descricao, valorMes, altura, largura, espessura, usuarioId
      }),
    })

    const body = await response.json()

    console.log(body)

    if (response.status === 200) {
      //this.setState({ moveis: body.data })
    }

    alert(body.msg)
  }

  render = () => {

    if (this.state.redirect) return <Redirect to='/' />

    return (
      <>
        <h1 className='mb-3'>Cadastrar Móvel</h1>

        <Form>

          <Form.Group>
            <Form.Label>Nome</Form.Label>
            <Form.Control type='text' value={this.state.nome} onChange={this.setNome} />
          </Form.Group>

          <Form.Group>
            <Form.Label>Descrição</Form.Label>
            <FormControl type='text' value={this.state.descricao} onChange={this.setDescricao} />
          </Form.Group>

          <Form.Group>
            <Form.Label>Valor por Mês</Form.Label>
            <Form.Control type='number' value={this.state.valorMes} onChange={this.setValorMes} />
          </Form.Group>

          <Form.Group>
            <Form.Label>Altura</Form.Label>
            <Form.Control type='number' value={this.state.altura} onChange={this.setAltura} />
          </Form.Group>

          <Form.Group>
            <Form.Label>Largura</Form.Label>
            <Form.Control type='number' value={this.state.largura} onChange={this.setLargura} />
          </Form.Group>

          <Form.Group>
            <Form.Label>Espessura</Form.Label>
            <Form.Control type='number' value={this.state.espessura} onChange={this.setEspessura} />
          </Form.Group>

          <Button onClick={this.request}>Cadastrar</Button>

        </Form>
      </>
    )

  }
}
