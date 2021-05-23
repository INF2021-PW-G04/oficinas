import {Entity, model, property, hasMany} from '@loopback/repository';
import {Cliente} from './cliente.model';
import {Reparacao} from './reparacao.model';

@model()
export class Oficina extends Entity {
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
  endereco: string;

  @property({
    type: 'string',
    required: true,
  })
  distrito: string;

  @property({
    type: 'string',
  })
  email?: string;

  @property({
    type: 'number',
  })
  num_contato?: number;

  @hasMany(() => Cliente, {keyTo: 'idOficina'})
  clientes: Cliente[];

  @hasMany(() => Reparacao, {keyTo: 'idOficina'})
  reparacoes: Reparacao[];

  constructor(data?: Partial<Oficina>) {
    super(data);
  }
}

export interface OficinaRelations {
  // describe navigational properties here
}

export type OficinaWithRelations = Oficina & OficinaRelations;
