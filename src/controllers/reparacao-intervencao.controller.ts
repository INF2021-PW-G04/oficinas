import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Reparacao,
  Intervencao,
} from '../models';
import {ReparacaoRepository} from '../repositories';

export class ReparacaoIntervencaoController {
  constructor(
    @repository(ReparacaoRepository) protected reparacaoRepository: ReparacaoRepository,
  ) { }

  @get('/reparacaos/{id}/intervencaos', {
    responses: {
      '200': {
        description: 'Array of Reparacao has many Intervencao',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Intervencao)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Intervencao>,
  ): Promise<Intervencao[]> {
    return this.reparacaoRepository.intervencoes(id).find(filter);
  }

  @post('/reparacaos/{id}/intervencaos', {
    responses: {
      '200': {
        description: 'Reparacao model instance',
        content: {'application/json': {schema: getModelSchemaRef(Intervencao)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Reparacao.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Intervencao, {
            title: 'NewIntervencaoInReparacao',
            exclude: ['id'],
            optional: ['idReparacao']
          }),
        },
      },
    }) intervencao: Omit<Intervencao, 'id'>,
  ): Promise<Intervencao> {
    return this.reparacaoRepository.intervencoes(id).create(intervencao);
  }

  @patch('/reparacaos/{id}/intervencaos', {
    responses: {
      '200': {
        description: 'Reparacao.Intervencao PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Intervencao, {partial: true}),
        },
      },
    })
    intervencao: Partial<Intervencao>,
    @param.query.object('where', getWhereSchemaFor(Intervencao)) where?: Where<Intervencao>,
  ): Promise<Count> {
    return this.reparacaoRepository.intervencoes(id).patch(intervencao, where);
  }

  @del('/reparacaos/{id}/intervencaos', {
    responses: {
      '200': {
        description: 'Reparacao.Intervencao DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Intervencao)) where?: Where<Intervencao>,
  ): Promise<Count> {
    return this.reparacaoRepository.intervencoes(id).delete(where);
  }
}
