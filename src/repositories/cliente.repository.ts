import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {DbOficinasDataSource} from '../datasources';
import {Cliente, ClienteRelations, Oficina, Automovel, Reparacao} from '../models';
import {OficinaRepository} from './oficina.repository';
import {AutomovelRepository} from './automovel.repository';
import {ReparacaoRepository} from './reparacao.repository';

export class ClienteRepository extends DefaultCrudRepository<
  Cliente,
  typeof Cliente.prototype.id,
  ClienteRelations
> {

  public readonly Oficina: BelongsToAccessor<Oficina, typeof Cliente.prototype.id>;

  public readonly automoveis: HasManyRepositoryFactory<Automovel, typeof Cliente.prototype.id>;

  public readonly reparacoes: HasManyRepositoryFactory<Reparacao, typeof Cliente.prototype.id>;

  constructor(
    @inject('datasources.db_oficinas') dataSource: DbOficinasDataSource, @repository.getter('OficinaRepository') protected oficinaRepositoryGetter: Getter<OficinaRepository>, @repository.getter('AutomovelRepository') protected automovelRepositoryGetter: Getter<AutomovelRepository>, @repository.getter('ReparacaoRepository') protected reparacaoRepositoryGetter: Getter<ReparacaoRepository>,
  ) {
    super(Cliente, dataSource);
    this.reparacoes = this.createHasManyRepositoryFactoryFor('reparacoes', reparacaoRepositoryGetter,);
    this.registerInclusionResolver('reparacoes', this.reparacoes.inclusionResolver);
    this.automoveis = this.createHasManyRepositoryFactoryFor('automoveis', automovelRepositoryGetter,);
    this.registerInclusionResolver('automoveis', this.automoveis.inclusionResolver);
    this.Oficina = this.createBelongsToAccessorFor('Oficina', oficinaRepositoryGetter,);
    this.registerInclusionResolver('Oficina', this.Oficina.inclusionResolver);
  }
}
