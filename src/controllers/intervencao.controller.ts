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
import {Intervencao} from '../models';
import {IntervencaoRepository} from '../repositories';

export class IntervencaoController {
  constructor(
    @repository(IntervencaoRepository)
    public intervencaoRepository : IntervencaoRepository,
  ) {}

  @post('/intervencaos')
  @response(200, {
    description: 'Intervencao model instance',
    content: {'application/json': {schema: getModelSchemaRef(Intervencao)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Intervencao, {
            title: 'NewIntervencao',
            exclude: ['id'],
          }),
        },
      },
    })
    intervencao: Omit<Intervencao, 'id'>,
  ): Promise<Intervencao> {
    return this.intervencaoRepository.create(intervencao);
  }

  @get('/intervencaos/count')
  @response(200, {
    description: 'Intervencao model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Intervencao) where?: Where<Intervencao>,
  ): Promise<Count> {
    return this.intervencaoRepository.count(where);
  }

  @get('/intervencaos')
  @response(200, {
    description: 'Array of Intervencao model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Intervencao, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Intervencao) filter?: Filter<Intervencao>,
  ): Promise<Intervencao[]> {
    return this.intervencaoRepository.find(filter);
  }

  @patch('/intervencaos')
  @response(200, {
    description: 'Intervencao PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Intervencao, {partial: true}),
        },
      },
    })
    intervencao: Intervencao,
    @param.where(Intervencao) where?: Where<Intervencao>,
  ): Promise<Count> {
    return this.intervencaoRepository.updateAll(intervencao, where);
  }

  @get('/intervencaos/{id}')
  @response(200, {
    description: 'Intervencao model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Intervencao, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Intervencao, {exclude: 'where'}) filter?: FilterExcludingWhere<Intervencao>
  ): Promise<Intervencao> {
    return this.intervencaoRepository.findById(id, filter);
  }

  @patch('/intervencaos/{id}')
  @response(204, {
    description: 'Intervencao PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Intervencao, {partial: true}),
        },
      },
    })
    intervencao: Intervencao,
  ): Promise<void> {
    await this.intervencaoRepository.updateById(id, intervencao);
  }

  @put('/intervencaos/{id}')
  @response(204, {
    description: 'Intervencao PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() intervencao: Intervencao,
  ): Promise<void> {
    await this.intervencaoRepository.replaceById(id, intervencao);
  }

  @del('/intervencaos/{id}')
  @response(204, {
    description: 'Intervencao DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.intervencaoRepository.deleteById(id);
  }
}
