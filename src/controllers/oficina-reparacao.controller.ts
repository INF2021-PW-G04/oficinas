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
  Oficina,
  Reparacao,
} from '../models';
import {OficinaRepository} from '../repositories';

export class OficinaReparacaoController {
  constructor(
    @repository(OficinaRepository) protected oficinaRepository: OficinaRepository,
  ) { }

  @get('/oficinas/{id}/reparacaos', {
    responses: {
      '200': {
        description: 'Array of Oficina has many Reparacao',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Reparacao)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Reparacao>,
  ): Promise<Reparacao[]> {
    return this.oficinaRepository.reparacoes(id).find(filter);
  }

  @post('/oficinas/{id}/reparacaos', {
    responses: {
      '200': {
        description: 'Oficina model instance',
        content: {'application/json': {schema: getModelSchemaRef(Reparacao)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Oficina.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Reparacao, {
            title: 'NewReparacaoInOficina',
            exclude: ['id'],
            optional: ['idOficina']
          }),
        },
      },
    }) reparacao: Omit<Reparacao, 'id'>,
  ): Promise<Reparacao> {
    return this.oficinaRepository.reparacoes(id).create(reparacao);
  }

  @patch('/oficinas/{id}/reparacaos', {
    responses: {
      '200': {
        description: 'Oficina.Reparacao PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Reparacao, {partial: true}),
        },
      },
    })
    reparacao: Partial<Reparacao>,
    @param.query.object('where', getWhereSchemaFor(Reparacao)) where?: Where<Reparacao>,
  ): Promise<Count> {
    return this.oficinaRepository.reparacoes(id).patch(reparacao, where);
  }

  @del('/oficinas/{id}/reparacaos', {
    responses: {
      '200': {
        description: 'Oficina.Reparacao DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Reparacao)) where?: Where<Reparacao>,
  ): Promise<Count> {
    return this.oficinaRepository.reparacoes(id).delete(where);
  }
}
