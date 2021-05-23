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
  Oficina,
} from '../models';
import {ReparacaoRepository} from '../repositories';

export class ReparacaoOficinaController {
  constructor(
    @repository(ReparacaoRepository)
    public reparacaoRepository: ReparacaoRepository,
  ) { }

  @get('/reparacaos/{id}/oficina', {
    responses: {
      '200': {
        description: 'Oficina belonging to Reparacao',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Oficina)},
          },
        },
      },
    },
  })
  async getOficina(
    @param.path.number('id') id: typeof Reparacao.prototype.id,
  ): Promise<Oficina> {
    return this.reparacaoRepository.Oficina(id);
  }
}
