import { Sequelize, Model, DataTypes, Optional } from 'sequelize';


type Attributes = {
  id: number;
  url: string;
  code: string;
}

type CreationAttributes = Optional<Attributes, 'id' | 'code'>;

export default class ShortUrl extends Model<Attributes, CreationAttributes> {
  public id!: number;
  public url!: string;
  public code?: string;

  static load(sequelize: Sequelize) {
    const options = {
      tableName: 'short_urls',
      paranoid: false,
      createdAt: 'created_at',
      updatedAt: false,
      sequelize
    }
    const model = {
      id: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false, autoIncrement: true, primaryKey: true },
      url: { type: DataTypes.TEXT, allowNull: false },
      code: { type: DataTypes.STRING(10) }
    }

    this.init(model, options)
  }


}