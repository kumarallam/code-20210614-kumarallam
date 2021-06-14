import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Bmi, BmiRelations} from '../models';

export class BmiRepository extends DefaultCrudRepository<
  Bmi,
  typeof Bmi.prototype.id,
  BmiRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Bmi, dataSource);
  }
}
