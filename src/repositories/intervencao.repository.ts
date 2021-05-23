import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {DbOficinasDataSource} from '../datasources';
import {Intervencao, IntervencaoRelations, Reparacao} from '../models';
import {ReparacaoRepository} from './reparacao.repository';

export class IntervencaoRepository extends DefaultCrudRepository<
  Intervencao,
  typeof Intervencao.prototype.id,
  IntervencaoRelations
> {

  public readonly Reparacao: BelongsToAccessor<Reparacao, typeof Intervencao.prototype.id>;

  constructor(
    @inject('datasources.db_oficinas') dataSource: DbOficinasDataSource, @repository.getter('ReparacaoRepository') protected reparacaoRepositoryGetter: Getter<ReparacaoRepository>,
  ) {
    super(Intervencao, dataSource);
    this.Reparacao = this.createBelongsToAccessorFor('Reparacao', reparacaoRepositoryGetter,);
    this.registerInclusionResolver('Reparacao', this.Reparacao.inclusionResolver);
  }
}
