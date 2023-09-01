export default class CustomArray {
  #value;

  constructor(...args) {
    this.#value = args;
  }

  getValue(index) {
    if (typeof index === "number") {
      return this.#value[index];
    } else {
      throw new Error("Index is not a number.");
    }
  }

  setValue(index, value) {
    if (typeof index !== "number") {
      throw new Error("Index is not a number.");
    } else if (
      this.#value[0] !== undefined &&
      typeof value !== typeof this.#value[0]
    ) {
      throw new Error("Value has a diferent type.");
    } else {
      this.#value[index] = value;
    }
  }

  getStructure() {
    return this.#value;
  }

  setStructure(structure) {
    return (this.#value = structure);
  }

  push(value) {
    if (
      this.#value[0] !== undefined &&
      typeof value !== typeof this.#value[0]
    ) {
      throw new Error("Value has a diferent type.");
    } else {
      const nextIndex = this.#value.length;
      this.setValue(nextIndex, value);
    }
  }

  unshift(value) {
    if (
      this.#value[0] !== undefined &&
      typeof value !== typeof this.#value[0]
    ) {
      throw new Error("Value has a diferent type.");
    } else {
      const newArray = new CustomArray();
      newArray.push(value);
      this.forEach((value) => newArray.push(value));
      this.setStructure(newArray.getStructure());
    }
  }

  shift() {
    if (this.#value.length) {
      const newArray = this.filter((_, index) => index !== 0);
      this.setStructure(newArray.getStructure());
    }
  }

  map(callback) {
    if (callback instanceof Function) {
      const newArray = new CustomArray();

      for (let index = 0; index < this.#value.length; index++) {
        const value = callback(this.#value[index], index, this.#value);
        newArray.push(value);
      }

      return newArray;
    } else {
      throw new Error("Callback is not a function.");
    }
  }

  filter(callback) {
    if (callback instanceof Function) {
      const newArray = new CustomArray();

      for (let index = 0; index < this.#value.length; index++) {
        const condition = callback(this.#value[index], index, this.#value);

        if (condition) {
          newArray.push(this.#value[index]);
        }
      }

      return newArray;
    } else {
      throw new Error("Callback is not a function.");
    }
  }

  find(callback) {
    if (callback instanceof Function) {
      for (let index = 0; index < this.#value.length; index++) {
        const condition = callback(this.#value[index], index, this.#value);

        if (condition) {
          return this.#value[index];
        }
      }
    } else {
      throw new Error("Callback is not a function.");
    }
  }

  findIndex(callback) {
    if (callback instanceof Function) {
      for (let index = 0; index < this.#value.length; index++) {
        const condition = callback(this.#value[index], index, this.#value);

        if (condition) {
          return index;
        }
      }

      return -1;
    } else {
      throw new Error("Callback is not a function.");
    }
  }

  some(callback) {
    if (callback instanceof Function) {
      for (let index = 0; index < this.#value.length; index++) {
        const condition = callback(this.#value[index], index, this.#value);

        if (condition) {
          return true;
        }
      }

      return false;
    } else {
      throw new Error("Callback is not a function.");
    }
  }

  includes(value) {
    for (let index = 0; index < this.#value.length; index++) {
      const condition = this.#value[index] === value;

      if (condition) {
        return true;
      }
    }

    return false;
  }

  reduce(callback, initialValue) {
    if (callback instanceof Function) {
      let newValue;
      const newArray = new CustomArray();

      this.forEach((value) => newArray.push(value));

      if (initialValue) {
        newValue = initialValue;
      } else {
        newValue = newArray.getValue(0);
        newArray.shift();
      }

      for (let index = 0; index < newArray.getStructure().length; index++) {
        newValue = callback(
          newValue,
          newArray.getValue(index),
          index,
          newArray.getStructure()
        );
      }

      return newValue;
    } else {
      throw new Error("Callback is not a function.");
    }
  }

  forEach(callback) {
    if (callback instanceof Function) {
      for (let index = 0; index < this.#value.length; index++) {
        callback(this.#value[index], index, this.#value);
      }
    } else {
      throw new Error("Callback is not a function.");
    }
  }
}
