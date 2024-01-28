export interface IProduct {
  name: string;
  price: number;
  releaseDate: string;
  brand: string;
  modelNumber: string;
  category: string;
  operatingSystem?: string;
  connectivity?: string[];
  powerSource?: string;
  features?: {
    cameraResolution?: number;
    storageCapacity?: number;
    screenSize?: number;
  };
  weight?: number;
  dimensions?: {
    height: number;
    width: number;
    depth: number;
  };
}
