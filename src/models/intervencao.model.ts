import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Reparacao} from './reparacao.model';

@model()
export class Intervencao extends Entity {
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
  descricao: string;

  @belongsTo(() => Reparacao, {name: 'Reparacao'})
  idReparacao: number;

  constructor(data?: Partial<Intervencao>) {
    super(data);
  }
}

export interface IntervencaoRelations {
  // describe navigational properties here
}

export type IntervencaoWithRelations = Intervencao & IntervencaoRelations;
