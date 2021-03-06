#
# MOVELLA
#

-- João Pedro Barroso
-- Leonardo Martin
-- Lucas Aquino
-- Lucas Vinícius
-- Matheus Valadares

drop database if exists movella;
create database movella;
use movella;

##### TABLES

create table tbl_contato (
  id int unsigned not null auto_increment primary key,
  nome varchar(100) not null,
  email varchar(100) not null,
  assunto varchar(50) not null,
  mensagem varchar(400) not null,
  data datetime not null default now()
);

create table tbl_usuario (
  id int unsigned not null auto_increment primary key,
  celular varchar(11),
  email varchar(200) not null,
  foto varchar(100) not null default 'default.png',
  senha char(40) not null,
  usuario varchar(20) not null,
  acesso int not null default 1,
  -- endereco
  cep char(8),
  logradouro varchar(200),
  complemento varchar(100),
  bairro varchar(100),
  cidade varchar(100),
  uf char(2)
);

create table tbl_categoria (
  id int unsigned not null auto_increment primary key,
  nome varchar(20) not null
);

create table tbl_avaliacao (
  id int unsigned not null auto_increment primary key,
  avaliacao int not null,
  avaliadorId int unsigned not null, foreign key(avaliadorId) references tbl_usuario(id),
  avaliadoId int unsigned not null, foreign key(avaliadoId) references tbl_usuario(id),
  data datetime not null default now()
);

create table tbl_movel (
  id int unsigned not null auto_increment primary key,
  categoriaId int unsigned not null, foreign key(categoriaId) references tbl_categoria(id),
  usuarioId int unsigned not null, foreign key(usuarioId) references tbl_usuario(id),
  descricao text,
  imagem varchar(100) not null default 'default.png',
  nome varchar(40) not null,
  valorMes double(9, 2) not null,
  disponivel bool not null,
  altura double not null,
  largura double not null,
  espessura double not null
);

create table tbl_aluguel (
  id int unsigned not null auto_increment primary key,
  movelId int unsigned not null, foreign key(movelId) references tbl_movel(id),
  usuarioId int unsigned not null, foreign key(usuarioId) references tbl_usuario(id),
  dataInicio datetime not null default now(),
  dataFim datetime not null,
  valorFrete double(9, 2) not null,
  -- movel
  descricao text,
  imagem varchar(100) default 'default.png',
  nome varchar(40),
  valorMes double(9, 2)
);

create table tbl_foto (
  id int unsigned not null auto_increment primary key,
  caminho varchar(200) not null,
  movelId int unsigned, foreign key(movelId) references tbl_movel(id),
  data datetime not null default now()
);

create table tbl_denuncia (
  id int unsigned not null auto_increment primary key,
  tipo enum('informacoes inconsistentes', 'anuncio indevido', 'outro') not null,
  descricao text,
  delatorId int unsigned not null, foreign key(delatorId) references tbl_usuario(id),
  usuarioId int unsigned, foreign key(usuarioId) references tbl_usuario(id),
  movelId int unsigned, foreign key(movelId) references tbl_movel(id),
  data datetime not null default now()
);

##### TRIGGERS

delimiter //

create trigger after_aluguel_insert
before insert
on tbl_aluguel for each row
begin
  select
    descricao,
    imagem,
    nome,
    valorMes
  into
    @descricao,
    @imagem,
    @nome,
    @valorMes
  from tbl_movel m
  where m.id = new.movelId;

	set new.descricao = @descricao;
	set new.imagem = @imagem;
	set new.nome = @nome;
	set new.valorMes = @valorMes;
end //

delimiter ;

##### VIEWS

create view view_movel as
select
  u.usuario,
  c.nome as categoria,
  m.nome,
  m.descricao,
  m.imagem,
  m.valorMes,
  m.disponivel,
  m.id,
  u.cidade
from tbl_movel m
join tbl_categoria c on m.categoriaId = c.id
join tbl_usuario u on m.usuarioId = u.id;

create view view_aluguel as
select
  a.id,
  u2.usuario as locador,
  u.usuario as locatario,
  a.nome,
  c.nome as categoria,
  a.valorMes,
  a.valorFrete,
  a.dataInicio,
  a.dataFim,
  a.descricao,
  a.imagem,
  u.email,
  u.celular
from tbl_aluguel a
join tbl_movel m on a.movelId = m.id
join tbl_categoria c on m.categoriaId = c.id
join tbl_usuario u on a.usuarioId = u.id
join tbl_usuario u2 on m.usuarioId = u2.id;

create view view_usuario as
select
  u.usuario,
  u.email,
  u.celular,
  u.foto,
  u.cep,
  u.logradouro,
  u.complemento,
  u.bairro,
  u.cidade,
  u.uf,
  u.acesso,
  floor((sum(a.avaliacao) / count(a.avaliacao)) * 10) / 10 as avaliacao,
  count(a.avaliacao) as avaliacoes
from tbl_usuario u
left join tbl_avaliacao a on a.avaliadoId = u.id;

create view view_denuncia_usuario as
select
  d.tipo,
  d.descricao as denuncia_descricao,
  d.data,
  delator.usuario as delator_usuario,
  delator.email as delator_email,
  delator.acesso as delator_acesso,
  u.email,
  u.usuario,
  u.acesso
from tbl_denuncia d
join tbl_usuario delator on d.delatorId = delator.id
join tbl_usuario u on d.usuarioId = u.id;

create view view_denuncia_movel as
select
  d.tipo,
  d.descricao as denuncia_descricao,
  d.data,
  delator.usuario as delator_usuario,
  delator.email as delator_email,
  delator.acesso as delator_acesso,
  m.nome,
  m.descricao,
  m.valorMes,
  m.id
from tbl_denuncia d
join tbl_usuario delator on d.delatorId = delator.id
join tbl_movel m on d.movelId = m.id;

##### INSERTS

insert into tbl_usuario (celular, email, senha, usuario, acesso, cep, logradouro, complemento, bairro, cidade, uf) values
('00000000000', 'admin@gmail.com', sha1('1234'), 'admin', 3, null, null, null, null, null, null),
('31912345678', 'pedro@gmail.com', sha1('1234'), 'Pedro', 1, null, null, null, null, null, null),
('31912345678', 'caio@gmail.com', sha1('1234'), 'Caio', 1, null, null, null, null, null, null),
('31912345678', 'caique@gmail.com', sha1('1234'), 'Caique', 2, '32050360', 'Rua Ápio Cardoso', '', 'Nova Contagem', 'Contagem', 'MG');

insert into tbl_categoria (nome) values
('Cadeiras'),
('Armários'),
('Mesas');

insert into tbl_avaliacao (avaliacao, avaliadorId, avaliadoId) values
(5, 1, 2),
(4, 3, 2),
(5, 2, 1);

insert into tbl_movel (categoriaId, usuarioId, descricao, imagem, nome, valorMes, disponivel, altura, largura, espessura) values
(1, 4, 'Cadeira plástica azul', 'cadeiraazul.png', 'Cadeira Azul', 14.00, 1, 1.2, 0.5, 0.6),
(1, 4, 'Cadeira plástica verde', 'cadeiraverde.png', 'Cadeira Verde', 10.00, 1, 1.2, 0.5, 0.6),
(1, 4, 'Cadeira plástica vermelha', 'cadeiravermelha.png', 'Cadeira Vermelha', 15.00, 1, 1.2, 0.5, 0.6),
(1, 4, 'Cadeira estofada', 'cadeiraestofada.png', 'Cadeira Estofada', 10.00, 1, 1.2, 0.5, 0.6),
(1, 4, 'Cadeira sem encosto', 'cadeirasemencosto.png', 'Cadeira Sem Encosto', 14.00, 1, 1.2, 0.5, 0.6),
(1, 4, 'Cadeira giratória', 'cadeiragiratoria.png', 'Cadeira Giratória', 10.00, 1, 1.2, 0.5, 0.6),

-- (1, 4, 'Cadeira plástica azul', 'cadeiraazul.png', 'Cadeira Azul', 14.00, 1),
-- (1, 4, 'Cadeira plástica verde', 'cadeiraverde.png', 'Cadeira Verde', 10.00, 1),
-- (1, 4, 'Cadeira plástica azul', 'cadeiraazul.png', 'Cadeira Azul', 14.00, 1),
-- (1, 4, 'Cadeira plástica verde', 'cadeiraverde.png', 'Cadeira Verde', 10.00, 1),
-- (1, 4, 'Cadeira plástica azul', 'cadeiraazul.png', 'Cadeira Azul', 14.00, 1),
-- (1, 4, 'Cadeira plástica verde', 'cadeiraverde.png', 'Cadeira Verde', 10.00, 1),

(2, 4, 'Armário rústico de madeira', 'armario.png', 'Armário Rústico', 30.00, 1, 2.0, 1.4, 0.9),
(3, 4, 'Mesa metálica', 'mesa.png', 'Mesa Metálica', 25.00, 1, 1.0, 0.9, 0.9);

insert into tbl_aluguel (movelId, usuarioId, dataFim, valorFrete) values
(1, 2, '2020-08-17', 14.00),
(2, 3, '2020-08-19', 16.00),
(3, 3, '2020-08-15', 10.00);

insert into tbl_foto (caminho, movelId) values
('cadeiraverde1.png', 2),
('cadeiraverde2.png', 2),
('cadeiraverde3.png', 2);

insert into tbl_denuncia (tipo, descricao, delatorId, usuarioId, movelId) values
('informacoes inconsistentes', null, 1, null, 1),
('informacoes inconsistentes', null, 2, null, 1),
('outro', 'Usuário suspeito', 3, 4, null);

##### SELECTS

-- select * from tbl_movel;
select * from tbl_usuario;
select * from view_movel;
-- select * from tbl_aluguel;
select * from view_aluguel;
select * from view_usuario;
select * from view_denuncia_usuario;
select * from view_denuncia_movel;
select * from tbl_contato;