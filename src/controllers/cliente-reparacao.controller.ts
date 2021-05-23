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
  Cliente,
  Reparacao,
} from '../models';
import {ClienteRepository} from '../repositories';

export class ClienteReparacaoController {
  constructor(
    @repository(ClienteRepository) protected clienteRepository: ClienteRepository,
  ) { }

  @get('/clientes/{id}/reparacaos', {
    responses: {
      '200': {
        description: 'Array of Cliente has many Reparacao',
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
    return this.clienteRepository.reparacoes(id).find(filter);
  }

  @post('/clientes/{id}/reparacaos', {
    responses: {
      '200': {
        description: 'Cliente model instance',
        content: {'application/json': {schema: getModelSchemaRef(Reparacao)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Cliente.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Reparacao, {
            title: 'NewReparacaoInCliente',
            exclude: ['id'],
            optional: ['idCliente']
          }),
        },
      },
    }) reparacao: Omit<Reparacao, 'id'>,
  ): Promise<Reparacao> {
    return this.clienteRepository.reparacoes(id).create(reparacao);
  }

  @patch('/clientes/{id}/reparacaos', {
    responses: {
      '200': {
        description: 'Cliente.Reparacao PATCH success count',
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
    return this.clienteRepository.reparacoes(id).patch(reparacao, where);
  }

  @del('/clientes/{id}/reparacaos', {
    responses: {
      '200': {
        description: 'Cliente.Reparacao DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Reparacao)) where?: Where<Reparacao>,
  ): Promise<Count> {
    return this.clienteRepository.reparacoes(id).delete(where);
  }
}
