export type ClienteT = {
    nome: string,
    sobrenome: string,
    empresa: string,
    localizacao: string,
    cpf: string,
  }

  export type EditClienteT = {
    nome: string,
    sobrenome: string,
    empresa: string,
    localizacao: string,
  }

  export type ProdutoT={
    produto:string,
    codigo:string,
    precoDeCompra:number,
    dataDaCompra:string,
    validade:string,
  }

  export type editProdutoT = {
    produto:string,
    precoDeCompra:string,
    dataDaCompra:string,
    validade:string,
    codigo:string,
  }
  export type SalesT={
    produto:string,
    quantidade:number,
    precoDeVenda:number,
    dataDaVenda:string,
    cliente:string,
    status:string,
    codigo:string

  }

  export type PedidosProdutosT={
    nome:string,
    quantidade:number,
    ganhos:number,
  }
  export type ClintesTopT={
    empresa:string,
    compras:number,
  }