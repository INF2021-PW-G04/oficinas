import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Automovel} from '../models';
import {AutomovelRepository} from '../repositories';

export class AutomovelController {
  constructor(
    @repository(AutomovelRepository)
    public automovelRepository : AutomovelRepository,
  ) {}

  @post('/automovels')
  @response(200, {
    description: 'Automovel model instance',
    content: {'application/json': {schema: getModelSchemaRef(Automovel)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Automovel, {
            title: 'NewAutomovel',
            
          }),
        },
      },
    })
    automovel: Automovel,
  ): Promise<Automovel> {
    return this.automovelRepository.create(automovel);
  }

  @get('/automovels/count')
  @response(200, {
    description: 'Automovel model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Automovel) where?: Where<Automovel>,
  ): Promise<Count> {
    return this.automovelRepository.count(where);
  }

  @get('/automovels')
  @response(200, {
    description: 'Array of Automovel model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Automovel, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Automovel) filter?: Filter<Automovel>,
  ): Promise<Automovel[]> {
    return this.automovelRepository.find(filter);
  }

  @patch('/automovels')
  @response(200, {
    description: 'Automovel PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Automovel, {partial: true}),
        },
      },
    })
    automovel: Automovel,
    @param.where(Automovel) where?: Where<Automovel>,
  ): Promise<Count> {
    return this.automovelRepository.updateAll(automovel, where);
  }

  @get('/automovels/{id}')
  @response(200, {
    description: 'Automovel model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Automovel, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Automovel, {exclude: 'where'}) filter?: FilterExcludingWhere<Automovel>
  ): Promise<Automovel> {
    return this.automovelRepository.findById(id, filter);
  }

  @patch('/automovels/{id}')
  @response(204, {
    description: 'Automovel PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Automovel, {partial: true}),
        },
      },
    })
    automovel: Automovel,
  ): Promise<void> {
    await this.automovelRepository.updateById(id, automovel);
  }

  @put('/automovels/{id}')
  @response(204, {
    description: 'Automovel PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() automovel: Automovel,
  ): Promise<void> {
    await this.automovelRepository.replaceById(id, automovel);
  }

  @del('/automovels/{id}')
  @response(204, {
    description: 'Automovel DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.automovelRepository.deleteById(id);
  }
}
