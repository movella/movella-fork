import React from 'react'

export default class Moveis extends React.Component {
  state = {
    moveis: [],
    quantidade: 20,
    pagina: 1,
  }

  componentDidMount = async () => {

    this.request()

  }

  request = async () => {

    const response = await fetch('http://localhost:5000/api/moveis', {
      method: 'post',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        pagina: this.state.pagina,
        quantidade: this.state.quantidade,
      }),
    })

    const body = await response.json()

    console.log(body)

    if (response.status === 200) {
      this.setState({ moveis: body.data })
    }

  }

  render = () => {

    return (
      <>
        <h1 className='mb-3'>Móveis</h1>
        {this.state.moveis.map((v, k) => (
          <div key={k} className='card m-2'>
            <div className='card-body'>
              <h4>{v.nome}</h4>
              <p>{v.descricao}</p>
            </div>
          </div>
        ))}
        <button onClick={this.tinim}>Tinim</button>
      </>
    )

  }
}
