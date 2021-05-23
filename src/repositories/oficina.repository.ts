import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {DbOficinasDataSource} from '../datasources';
import {Oficina, OficinaRelations, Cliente, Reparacao} from '../models';
import {ClienteRepository} from './cliente.repository';
import {ReparacaoRepository} from './reparacao.repository';

export class OficinaRepository extends DefaultCrudRepository<
  Oficina,
  typeof Oficina.prototype.id,
  OficinaRelations
> {

  public readonly clientes: HasManyRepositoryFactory<Cliente, typeof Oficina.prototype.id>;

  public readonly reparacoes: HasManyRepositoryFactory<Reparacao, typeof Oficina.prototype.id>;

  constructor(
    @inject('datasources.db_oficinas') dataSource: DbOficinasDataSource, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>, @repository.getter('ReparacaoRepository') protected reparacaoRepositoryGetter: Getter<ReparacaoRepository>,
  ) {
    super(Oficina, dataSource);
    this.reparacoes = this.createHasManyRepositoryFactoryFor('reparacoes', reparacaoRepositoryGetter,);
    this.registerInclusionResolver('reparacoes', this.reparacoes.inclusionResolver);
    this.clientes = this.createHasManyRepositoryFactoryFor('clientes', clienteRepositoryGetter,);
    this.registerInclusionResolver('clientes', this.clientes.inclusionResolver);
  }
}
