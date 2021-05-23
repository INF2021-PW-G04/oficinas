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
  Automovel,
  Reparacao,
} from '../models';
import {AutomovelRepository} from '../repositories';

export class AutomovelReparacaoController {
  constructor(
    @repository(AutomovelRepository) protected automovelRepository: AutomovelRepository,
  ) { }

  @get('/automovels/{id}/reparacaos', {
    responses: {
      '200': {
        description: 'Array of Automovel has many Reparacao',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Reparacao)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Reparacao>,
  ): Promise<Reparacao[]> {
    return this.automovelRepository.reparacaos(id).find(filter);
  }

  @post('/automovels/{id}/reparacaos', {
    responses: {
      '200': {
        description: 'Automovel model instance',
        content: {'application/json': {schema: getModelSchemaRef(Reparacao)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Automovel.prototype.matricula,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Reparacao, {
            title: 'NewReparacaoInAutomovel',
            exclude: ['id'],
            optional: ['idAutomovel']
          }),
        },
      },
    }) reparacao: Omit<Reparacao, 'id'>,
  ): Promise<Reparacao> {
    return this.automovelRepository.reparacaos(id).create(reparacao);
  }

  @patch('/automovels/{id}/reparacaos', {
    responses: {
      '200': {
        description: 'Automovel.Reparacao PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
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
    return this.automovelRepository.reparacaos(id).patch(reparacao, where);
  }

  @del('/automovels/{id}/reparacaos', {
    responses: {
      '200': {
        description: 'Automovel.Reparacao DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Reparacao)) where?: Where<Reparacao>,
  ): Promise<Count> {
    return this.automovelRepository.reparacaos(id).delete(where);
  }
}
