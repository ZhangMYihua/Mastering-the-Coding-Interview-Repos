class Person {
  constructor(name) {
    this.name = name;
    this.isAlive = true;
    this.children = [];
  }
}

class Monarchy {
  constructor(king) {
    this.king = new Person(king);
    this._persons = {
      [this.king.name]: this.king,
    };
  }

  birth(childName, parentName) {
    const parent = this._persons[parentName];
    const newChild = new Person(childName);
    parent.children.push(newChild);
    this._persons[childName] = newChild;
  }

  death(name) {
    const person = this._persons[name];
    if (person === undefined) {
      return null;
    }
    person.isAlive = false;
  }

  getOrderOfSuccession() {
    const order = [];
    this._dfs(this.king, order);
    return order;
  }

  _dfs(currentPerson, order) {
    if (currentPerson.isAlive) {
      order.push(currentPerson.name);
    }
    for (let i = 0; i < currentPerson.children.length; i++) {
      this._dfs(currentPerson.children[i], order);
    }
  }
}

const monarchy = new Monarchy('Jake');
console.log(monarchy);
monarchy.birth('Catherine', 'Jake');
console.log(monarchy);
monarchy.birth('Tom', 'Jake');
console.log(monarchy);
monarchy.birth('Celine', 'Jake');
console.log(monarchy);
monarchy.birth('Jane', 'Catherine');
console.log(monarchy);
monarchy.birth('Peter', 'Celine');
console.log(monarchy);
monarchy.birth('Farah', 'Jane');
console.log(monarchy);
monarchy.birth('Mark', 'Catherine');
console.log(monarchy);
console.log(monarchy.getOrderOfSuccession());
monarchy.death('Jake');
console.log(monarchy);
monarchy.death('Jane');
console.log(monarchy);
console.log(monarchy.getOrderOfSuccession());
