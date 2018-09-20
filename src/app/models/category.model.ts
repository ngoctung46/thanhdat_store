export class Category {
  _id: string;
  name: string;
  description: string;
  products: any[];
  store_id: string;

  constructor(obj?: any) {
    this._id = obj && obj._id || null;
    this.name = obj && obj.name || null;
    this.description = obj && obj.description || null;
    this.store_id = obj && obj.description || null;
  }
}
