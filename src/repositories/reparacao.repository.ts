import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {DbOficinasDataSource} from '../datasources';
import {Reparacao, ReparacaoRelations, Oficina, Cliente, Automovel, Intervencao} from '../models';
import {OficinaRepository} from './oficina.repository';
import {ClienteRepository} from './cliente.repository';
import {AutomovelRepository} from './automovel.repository';
import {IntervencaoRepository} from './intervencao.repository';

export class ReparacaoRepository extends DefaultCrudRepository<
  Reparacao,
  typeof Reparacao.prototype.id,
  ReparacaoRelations
> {

  public readonly Oficina: BelongsToAccessor<Oficina, typeof Reparacao.prototype.id>;

  public readonly Cliente: BelongsToAccessor<Cliente, typeof Reparacao.prototype.id>;

  public readonly Automovel: BelongsToAccessor<Automovel, typeof Reparacao.prototype.id>;

  public readonly intervencoes: HasManyRepositoryFactory<Intervencao, typeof Reparacao.prototype.id>;

  constructor(
    @inject('datasources.db_oficinas') dataSource: DbOficinasDataSource, @repository.getter('OficinaRepository') protected oficinaRepositoryGetter: Getter<OficinaRepository>, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>, @repository.getter('AutomovelRepository') protected automovelRepositoryGetter: Getter<AutomovelRepository>, @repository.getter('IntervencaoRepository') protected intervencaoRepositoryGetter: Getter<IntervencaoRepository>,
  ) {
    super(Reparacao, dataSource);
    this.intervencoes = this.createHasManyRepositoryFactoryFor('intervencoes', intervencaoRepositoryGetter,);
    this.registerInclusionResolver('intervencoes', this.intervencoes.inclusionResolver);
    this.Automovel = this.createBelongsToAccessorFor('Automovel', automovelRepositoryGetter,);
    this.registerInclusionResolver('Automovel', this.Automovel.inclusionResolver);
    this.Cliente = this.createBelongsToAccessorFor('Cliente', clienteRepositoryGetter,);
    this.registerInclusionResolver('Cliente', this.Cliente.inclusionResolver);
    this.Oficina = this.createBelongsToAccessorFor('Oficina', oficinaRepositoryGetter,);
    this.registerInclusionResolver('Oficina', this.Oficina.inclusionResolver);
  }
}
