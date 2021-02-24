class Movel {
  /**
   * @private
   */
  id
  /**
   * @private
   */
  categoriaId
  /**
   * @private
   */
  usuarioId
  /**
   * @private
   */
  descricao
  /**
   * @private
   */
  imagem
  /**
   * @private
   */
  nome
  /**
   * @private
   */
  valorMes
  /**
   * @private
   */
  disponivel
  /**
   * @private
   */
  altura
  /**
   * @private
   */
  largura
  /**
   * @private
   */
  espessura

  /**
   * @returns {number}
   */
  get Id() {
    return this.id
  }
  /**
   * @param {number} id
   */
  set Id(id) {
    if (isNaN(id)) throw 'Id não permitido'
    id = parseInt(id)
    if (id <= 0) throw 'Id não permitido'
    this.id = id
  }

  /**
   * @returns {number}
   */
  get CategoriaId() {
    return this.categoriaId
  }
  /**
   * @param {number} categoriaId
   */
  set CategoriaId(categoriaId) {
    if (isNaN(categoriaId)) throw 'Id categoria não permitido'
    categoriaId = parseInt(categoriaId)
    if (categoriaId <= 0) throw 'Id categoria não permitido'
    this.categoriaId = categoriaId
  }

  /**
   * @returns {number}
   */
  get UsuarioId() {
    return this.usuarioId
  }
  /**
   * @param {number} usuarioId
   */
  set UsuarioId(usuarioId) {
    if (isNaN(usuarioId)) throw 'Id usuário não permitido'
    usuarioId = parseInt(usuarioId)
    if (usuarioId <= 0) throw 'Id usuário não permitido'
    this.usuarioId = usuarioId
  }

  /**
   * @returns {string}
   */
  get Descricao() {
    return this.descricao
  }
  /**
   * @param {string} descricao
   */
  set Descricao(descricao) {
    if (typeof descricao !== 'string') throw 'Descrição não permitida'
    if (descricao.length === 0) throw 'Descrição não permitida'
    this.descricao = descricao
  }

  /**
   * @returns {string}
   */
  get Imagem() {
    return this.imagem
  }
  /**
   * @param {string} imagem
   */
  set Imagem(imagem) {
    if (typeof imagem !== 'string') throw 'Imagem não permitida'
    if (imagem.length === 0) throw 'Imagem não permitida'
    this.imagem = imagem
  }

  /**
   * @returns {string}
   */
  get Nome() {
    return this.nome
  }
  /**
   * @param {string} nome
   */
  set Nome(nome) {
    if (typeof nome !== 'string') throw 'Nome não permitido'
    if (nome.length === 0) throw 'Nome não permitido'
    this.nome = nome
  }

  /**
   * @returns {number}
   */
  get ValorMes() {
    return this.valorMes
  }
  /**
   * @param {number} valorMes
   */
  set ValorMes(valorMes) {
    if (isNaN(valorMes)) throw 'Valor mês não permitido'
    valorMes = parseFloat(valorMes)
    if (valorMes <= 0) throw 'Valor mês não permitido'
    this.valorMes = valorMes
  }

  /**
   * @returns {number}
   */
  get Disponivel() {
    return this.disponivel
  }
  /**
   * @param {number} disponivel
   */
  set Disponivel(disponivel) {
    if (isNaN(disponivel)) throw 'Disponibilidade não permitida'
    disponivel = parseInt(disponivel)
    if (disponivel !== 0 && disponivel !== 1) throw 'Disponibilidade não permitida'
    this.disponivel = disponivel
  }

  /**
   * @returns {number}
   */
  get Altura() {
    return this.altura
  }
  /**
   * @param {number} altura
   */
  set Altura(altura) {
    if (isNaN(altura)) throw 'Altura não permitida'
    altura = parseFloat(altura)
    if (altura <= 0) throw 'Altura não permitida'
    this.altura = altura
  }

  /**
   * @returns {number}
   */
  get Largura() {
    return this.largura
  }
  /**
   * @param {number} largura
   */
  set Largura(largura) {
    if (isNaN(largura)) throw 'Largura não permitida'
    largura = parseFloat(largura)
    if (largura <= 0) throw 'Largura não permitida'
    this.largura = largura
  }

  /**
   * @returns {number}
   */
  get Espessura() {
    return this.espessura
  }
  /**
   * @param {number} espessura
   */
  set Espessura(espessura) {
    if (isNaN(espessura)) throw 'Espessura não permitida'
    espessura = parseFloat(espessura)
    if (espessura <= 0) throw 'Espessura não permitida'
    this.espessura = espessura
  }

  /**
   * @method
   * @returns {string}
   */
  Insert = () =>
    `insert into tbl_movel values (
      null,
      '${this.categoriaId}', 
      '${this.usuarioId}', 
      '${this.descricao}', 
      '${this.imagem}', 
      '${this.nome}', 
      '${this.valorMes}', 
      '${this.disponivel}', 
      '${this.altura}', 
      '${this.largura}', 
      '${this.espessura}'
      )`
}

module.exports = { Movel }