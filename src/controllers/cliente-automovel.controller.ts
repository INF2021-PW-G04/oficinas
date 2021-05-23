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
  Automovel,
} from '../models';
import {ClienteRepository} from '../repositories';

export class ClienteAutomovelController {
  constructor(
    @repository(ClienteRepository) protected clienteRepository: ClienteRepository,
  ) { }

  @get('/clientes/{id}/automovels', {
    responses: {
      '200': {
        description: 'Array of Cliente has many Automovel',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Automovel)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Automovel>,
  ): Promise<Automovel[]> {
    return this.clienteRepository.automoveis(id).find(filter);
  }

  @post('/clientes/{id}/automovels', {
    responses: {
      '200': {
        description: 'Cliente model instance',
        content: {'application/json': {schema: getModelSchemaRef(Automovel)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Cliente.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Automovel, {
            title: 'NewAutomovelInCliente',
            exclude: ['matricula'],
            optional: ['idCliente']
          }),
        },
      },
    }) automovel: Omit<Automovel, 'matricula'>,
  ): Promise<Automovel> {
    return this.clienteRepository.automoveis(id).create(automovel);
  }

  @patch('/clientes/{id}/automovels', {
    responses: {
      '200': {
        description: 'Cliente.Automovel PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Automovel, {partial: true}),
        },
      },
    })
    automovel: Partial<Automovel>,
    @param.query.object('where', getWhereSchemaFor(Automovel)) where?: Where<Automovel>,
  ): Promise<Count> {
    return this.clienteRepository.automoveis(id).patch(automovel, where);
  }

  @del('/clientes/{id}/automovels', {
    responses: {
      '200': {
        description: 'Cliente.Automovel DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Automovel)) where?: Where<Automovel>,
  ): Promise<Count> {
    return this.clienteRepository.automoveis(id).delete(where);
  }
}
