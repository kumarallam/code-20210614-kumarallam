/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  repository
} from '@loopback/repository';
import {
  get
} from '@loopback/rest';
import {Bmi} from '../models';
import {BmiRepository} from '../repositories';

export class BmiController {
  constructor(
    @repository(BmiRepository)
    public bmiRepository: BmiRepository,
  ) { }



  @get('/bmis', {
    responses: {
      '200': {
        'application/json': {
          type: 'Array',
          items: {
            properties: {
              Gender: {type: 'string'},
              HeightCm: {type: 'number'},
              WeightKg: {type: 'number'},
              Bmi: {type: 'string'},
              BmiRange: {type: 'string'},
              HealthRisk: {type: 'string'}
            },
          },
        },
      },
    }
  })
  async find(
  ): Promise<Array<Bmi>> {
    const result: Array<Bmi> = await this.bmiRepository.find({});
    const resp = await this.calculateBmi(result);
    return resp.bmis;
  }


  async calculateBmi(bmis: Array<Bmi>) {
    let OverWeightCount = 0;
    bmis.map((obj): any => {
      // let OverWeightCount = 0
      const weight = obj.WeightKg ? obj.WeightKg : 0;
      const height = obj.HeightCm ? obj.HeightCm / 100 : 0;
      obj.Bmi = weight / height;
      if (obj.Bmi <= 18.4) {
        obj.BmiRange = '18.4 and Below';
        obj.HealthRisk = 'Malnutrition risk';
      }
      else if (obj.Bmi > 18.4 && obj.Bmi <= 24.9) {
        obj.BmiRange = '18.5 to 24.9';
        obj.HealthRisk = 'Low risk';
      }
      else if (obj.Bmi > 24.9 && obj.Bmi <= 29.9) {
        obj.BmiRange = '25 to 29.9';
        obj.HealthRisk = 'Enhanced risk';
      }
      else if (obj.Bmi > 29.9 && obj.Bmi <= 34.9) {
        obj.BmiRange = '30 to 34.9';
        obj.HealthRisk = 'Medium risk';
      }
      else if (obj.Bmi > 34.9 && obj.Bmi <= 39.9) {
        obj.BmiRange = '35 to 39.9';
        obj.HealthRisk = 'High risk';
      }
      else if (obj.Bmi > 39.9) {
        obj.BmiRange = '40 and Above';
        obj.HealthRisk = 'Very High risk';
      }

      if (obj.Bmi >= 25) {
        OverWeightCount++;
      }
      return obj;
    })
    console.log("OverWeightCount", OverWeightCount)
    return {bmis: bmis, OverWeightCount: OverWeightCount};

  }


}
