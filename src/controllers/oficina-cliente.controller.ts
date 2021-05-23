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
  Cliente,
} from '../models';
import {OficinaRepository} from '../repositories';

export class OficinaClienteController {
  constructor(
    @repository(OficinaRepository) protected oficinaRepository: OficinaRepository,
  ) { }

  @get('/oficinas/{id}/clientes', {
    responses: {
      '200': {
        description: 'Array of Oficina has many Cliente',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Cliente)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Cliente>,
  ): Promise<Cliente[]> {
    return this.oficinaRepository.clientes(id).find(filter);
  }

  @post('/oficinas/{id}/clientes', {
    responses: {
      '200': {
        description: 'Oficina model instance',
        content: {'application/json': {schema: getModelSchemaRef(Cliente)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Oficina.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cliente, {
            title: 'NewClienteInOficina',
            exclude: ['id'],
            optional: ['idOficina']
          }),
        },
      },
    }) cliente: Omit<Cliente, 'id'>,
  ): Promise<Cliente> {
    return this.oficinaRepository.clientes(id).create(cliente);
  }

  @patch('/oficinas/{id}/clientes', {
    responses: {
      '200': {
        description: 'Oficina.Cliente PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cliente, {partial: true}),
        },
      },
    })
    cliente: Partial<Cliente>,
    @param.query.object('where', getWhereSchemaFor(Cliente)) where?: Where<Cliente>,
  ): Promise<Count> {
    return this.oficinaRepository.clientes(id).patch(cliente, where);
  }

  @del('/oficinas/{id}/clientes', {
    responses: {
      '200': {
        description: 'Oficina.Cliente DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Cliente)) where?: Where<Cliente>,
  ): Promise<Count> {
    return this.oficinaRepository.clientes(id).delete(where);
  }
}
