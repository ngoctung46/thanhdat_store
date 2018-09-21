import { Category } from './category.model';
export class Product {
  _id?: string;
  name: string;
  description: string;
  price: number;
  available: boolean;
  on_sale: boolean;
  views: number;
  category_id: string;
  image_urls: string[];
  category: Category;
  createdAt?: Date;
  updatedAt?: Date;

  constructor(obj?: any) {
    this._id = obj && obj._id || null;
    this.name = obj && obj.name || null;
    this.description = obj && obj.description || null;
    this.price = obj && obj.price || 0;
    this.available = obj && obj.available || true;
    this.on_sale = obj && obj.on_sale || false;
    this.category_id = obj && obj.category_id || null;
    this.image_urls = obj && obj.image_urls || [];
    this.createdAt = obj && obj.createdAt || null;
    this.updatedAt = obj && obj.updatedAt || null;
    this.category = obj && obj.category || new Category();
  }
}
