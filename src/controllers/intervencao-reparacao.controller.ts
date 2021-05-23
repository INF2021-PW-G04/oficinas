import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Intervencao,
  Reparacao,
} from '../models';
import {IntervencaoRepository} from '../repositories';

export class IntervencaoReparacaoController {
  constructor(
    @repository(IntervencaoRepository)
    public intervencaoRepository: IntervencaoRepository,
  ) { }

  @get('/intervencaos/{id}/reparacao', {
    responses: {
      '200': {
        description: 'Reparacao belonging to Intervencao',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Reparacao)},
          },
        },
      },
    },
  })
  async getReparacao(
    @param.path.number('id') id: typeof Intervencao.prototype.id,
  ): Promise<Reparacao> {
    return this.intervencaoRepository.Reparacao(id);
  }
}
