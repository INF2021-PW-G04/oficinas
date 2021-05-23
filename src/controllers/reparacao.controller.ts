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
import {Reparacao} from '../models';
import {ReparacaoRepository} from '../repositories';

export class ReparacaoController {
  constructor(
    @repository(ReparacaoRepository)
    public reparacaoRepository : ReparacaoRepository,
  ) {}

  @post('/reparacaos')
  @response(200, {
    description: 'Reparacao model instance',
    content: {'application/json': {schema: getModelSchemaRef(Reparacao)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Reparacao, {
            title: 'NewReparacao',
            exclude: ['id'],
          }),
        },
      },
    })
    reparacao: Omit<Reparacao, 'id'>,
  ): Promise<Reparacao> {
    return this.reparacaoRepository.create(reparacao);
  }

  @get('/reparacaos/count')
  @response(200, {
    description: 'Reparacao model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Reparacao) where?: Where<Reparacao>,
  ): Promise<Count> {
    return this.reparacaoRepository.count(where);
  }

  @get('/reparacaos')
  @response(200, {
    description: 'Array of Reparacao model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Reparacao, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Reparacao) filter?: Filter<Reparacao>,
  ): Promise<Reparacao[]> {
    return this.reparacaoRepository.find(filter);
  }

  @patch('/reparacaos')
  @response(200, {
    description: 'Reparacao PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Reparacao, {partial: true}),
        },
      },
    })
    reparacao: Reparacao,
    @param.where(Reparacao) where?: Where<Reparacao>,
  ): Promise<Count> {
    return this.reparacaoRepository.updateAll(reparacao, where);
  }

  @get('/reparacaos/{id}')
  @response(200, {
    description: 'Reparacao model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Reparacao, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Reparacao, {exclude: 'where'}) filter?: FilterExcludingWhere<Reparacao>
  ): Promise<Reparacao> {
    return this.reparacaoRepository.findById(id, filter);
  }

  @patch('/reparacaos/{id}')
  @response(204, {
    description: 'Reparacao PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Reparacao, {partial: true}),
        },
      },
    })
    reparacao: Reparacao,
  ): Promise<void> {
    await this.reparacaoRepository.updateById(id, reparacao);
  }

  @put('/reparacaos/{id}')
  @response(204, {
    description: 'Reparacao PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() reparacao: Reparacao,
  ): Promise<void> {
    await this.reparacaoRepository.replaceById(id, reparacao);
  }

  @del('/reparacaos/{id}')
  @response(204, {
    description: 'Reparacao DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.reparacaoRepository.deleteById(id);
  }
}
