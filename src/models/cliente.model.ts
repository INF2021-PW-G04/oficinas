import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Oficina} from './oficina.model';
import {Automovel} from './automovel.model';
import {Reparacao} from './reparacao.model';

@model()
export class Cliente extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;
  @property({
    type: 'string',
    required: true,
  })
  nome: string;

  @property({
    type: 'string',
    required: true,
  })
  apelido: string;

  @property({
    type: 'number',
  })
  num_telefone?: number;

  @property({
    type: 'string',
  })
  carta_conducao?: string;

  @belongsTo(() => Oficina, {name: 'Oficina'})
  idOficina: number;

  @hasMany(() => Automovel, {keyTo: 'idCliente'})
  automoveis: Automovel[];

  @hasMany(() => Reparacao, {keyTo: 'idCliente'})
  reparacoes: Reparacao[];

  constructor(data?: Partial<Cliente>) {
    super(data);
  }
}

export interface ClienteRelations {
  // describe navigational properties here
}

export type ClienteWithRelations = Cliente & ClienteRelations;
