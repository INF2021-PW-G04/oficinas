import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {DbOficinasDataSource} from '../datasources';
import {Automovel, AutomovelRelations, Cliente, Reparacao} from '../models';
import {ClienteRepository} from './cliente.repository';
import {ReparacaoRepository} from './reparacao.repository';

export class AutomovelRepository extends DefaultCrudRepository<
  Automovel,
  typeof Automovel.prototype.matricula,
  AutomovelRelations
> {

  public readonly Cliente: BelongsToAccessor<Cliente, typeof Automovel.prototype.matricula>;

  public readonly reparacaos: HasManyRepositoryFactory<Reparacao, typeof Automovel.prototype.matricula>;

  constructor(
    @inject('datasources.db_oficinas') dataSource: DbOficinasDataSource, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>, @repository.getter('ReparacaoRepository') protected reparacaoRepositoryGetter: Getter<ReparacaoRepository>,
  ) {
    super(Automovel, dataSource);
    this.reparacaos = this.createHasManyRepositoryFactoryFor('reparacaos', reparacaoRepositoryGetter,);
    this.registerInclusionResolver('reparacaos', this.reparacaos.inclusionResolver);
    this.Cliente = this.createBelongsToAccessorFor('Cliente', clienteRepositoryGetter,);
    this.registerInclusionResolver('Cliente', this.Cliente.inclusionResolver);
  }
}
