import { OrderByCountryPipe } from './order-by-country.pipe';

describe('OrderByCountryPipe', () => {
  it('create an instance', () => {
    const pipe = new OrderByCountryPipe();
    expect(pipe).toBeTruthy();
  });
});
