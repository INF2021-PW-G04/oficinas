import {belongsTo, Entity, hasMany, model, property} from '@loopback/repository';
import {Automovel} from './automovel.model';
import {Cliente} from './cliente.model';
import {Intervencao} from './intervencao.model';
import {Oficina} from './oficina.model';

@model()
export class Reparacao extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;
  @property({
    type: 'date',
    required: true,
  })
  data: string;

  @property({
    type: 'number',
    required: true,
  })
  custo: number;

  @belongsTo(() => Oficina, {name: 'Oficina'})
  idOficina: number;

  @belongsTo(() => Cliente, {name: 'Cliente'})
  idCliente: number;

  @belongsTo(() => Automovel, {name: 'Automovel'})
  idAutomovel: string;

  @hasMany(() => Intervencao, {keyTo: 'idReparacao'})
  intervencoes: Intervencao[];
  constructor(data?: Partial<Reparacao>) {
    super(data);
  }
}

export interface ReparacaoRelations {
  // describe navigational properties here
}

export type ReparacaoWithRelations = Reparacao & ReparacaoRelations;
