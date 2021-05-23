import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Reparacao,
  Cliente,
} from '../models';
import {ReparacaoRepository} from '../repositories';

export class ReparacaoClienteController {
  constructor(
    @repository(ReparacaoRepository)
    public reparacaoRepository: ReparacaoRepository,
  ) { }

  @get('/reparacaos/{id}/cliente', {
    responses: {
      '200': {
        description: 'Cliente belonging to Reparacao',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Cliente)},
          },
        },
      },
    },
  })
  async getCliente(
    @param.path.number('id') id: typeof Reparacao.prototype.id,
  ): Promise<Cliente> {
    return this.reparacaoRepository.Cliente(id);
  }
}
