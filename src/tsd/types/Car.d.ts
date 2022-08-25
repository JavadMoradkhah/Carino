import Brand from './Brand';
import Location from './Location';
import Seller from './Seller';

interface Car {
  brand: Brand;
  condition: string;
  description: string;
  driveTrain: string;
  exteriorColor: string;
  fuelType: string;
  images: string[];
  interiorColor: string;
  location: Location;
  mileage: number;
  model: string;
  price: number;
  seller: Seller;
  status: string;
  transmission: string;
  trim: string;
  type: string;
  year: number;
}

export default Car;
