import {Entity, model, property} from '@loopback/repository';

@model()
export class Bmi extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
  })
  Gender?: string;

  @property({
    type: 'number',
  })
  HeightCm?: number;

  @property({
    type: 'number',
  })
  WeightKg?: number;

  @property({
    type: 'number',
  })
  Bmi?: number;

  @property({
    type: 'string',
  })
  BmiRange?: string;

  @property({
    type: 'string',
  })
  HealthRisk?: string;


  constructor(data?: Partial<Bmi>) {
    super(data);
  }
}

export interface BmiRelations {
  // describe navigational properties here
}

export type BmiWithRelations = Bmi & BmiRelations;
