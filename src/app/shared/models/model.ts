
export abstract class Model {
  constructor (data?: Model) {
    if (data) {
      this.assimilate(data);
    }

    this.init();
  }

  /**
   * Called after an object has been constructed.
   */
   public abstract init (): void;

  /**
   * Clones and assimilates the given data, where it's structure matches that
   * of the current object.
   *
   * @param data
   * @returns {Model}
   */
  public assimilate (data: any): Model {
    let cloned = JSON.parse(JSON.stringify(data));

    for (let propertyName of Object.keys(cloned)) {
      this[propertyName] = cloned[propertyName];
    }

    return this;
  }

  protected setBlankDataStructure (data: any): Model {
    Object.assign(this, data);

    return this;
  }
}
