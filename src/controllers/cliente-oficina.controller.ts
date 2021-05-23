import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Cliente,
  Oficina,
} from '../models';
import {ClienteRepository} from '../repositories';

export class ClienteOficinaController {
  constructor(
    @repository(ClienteRepository)
    public clienteRepository: ClienteRepository,
  ) { }

  @get('/clientes/{id}/oficina', {
    responses: {
      '200': {
        description: 'Oficina belonging to Cliente',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Oficina)},
          },
        },
      },
    },
  })
  async getOficina(
    @param.path.number('id') id: typeof Cliente.prototype.id,
  ): Promise<Oficina> {
    return this.clienteRepository.Oficina(id);
  }
}
