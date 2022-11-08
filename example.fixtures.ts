import { test as base } from '@playwright/test';

export type Fixtures = {
    countries: any;
  }
  
  export type Metadata = {
    country: Country;
  }
  
  export enum Country {
    Germany = "de",
    Spain = "es"
  }

export const test = base.extend<Fixtures & Metadata>({
    countries: [async ({ }, use, worker) => {
          let skip = true;

          console.log(`Worker is currently running the project ${worker.project.name} which has the country ${worker.project.use.country}`)
          console.log(`The current test being run has the test.use property ${worker._test.parent._use[0].fixtures.country} set as its country.`)

          // Sorts through options passed through test.use before test, skips if country doesn't match project
          if(worker._test.parent._use[0].fixtures.country == worker.project.use.country) {
            console.log(`Since ${worker._test.parent._use[0].fixtures.country} and ${worker.project.use.country} matches, this test will be ran.`)
            skip = false;
          }
          else {
            console.log(`Since ${worker._test.parent._use[0].fixtures.country} and ${worker.project.use.country} doesn't match, this test will be skipped.`)
          }
  
          test.skip(skip);
          await use();
      }, { auto: true }],
  });