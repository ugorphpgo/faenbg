//класс юнит - определяет юнита(отряд) в текущем его состоянии
class Unit {
  constructor(name, hp, damage, morale, speed, unitType) {
    this.name = name;
    this.unitType = unitType;

    this.maxHp = hp;
    this.currentHp = hp;
    this.maxMorale = morale;
    this.currentMorale = morale;
    this.speed = speed;
    this.damage = damage;
    this.position = {
      x: null,
      y: null,
    };

    this.damageModifiers = {
      damageFromRanged: 1,
    };
    this.abilities = [];
  }

  //Метод  для проверки - есть ли штраф за отсуствие половины воиска
  getEffectiveDamage() {
    const halfHp = this.maxHp / 2;

    if (this.currentHp <= halfHp) {
      return this.damage * 0.5;
    }

    return this.damage;
  }
  //метод - проверка жив ли отряд
  isAlive() {
    return this.currentHp > 0;
  }

  // Метод — cбежал ли юнит с поля боя из-за морали
  isRouting() {
    return this.currentMorale <= 0;
  }
}

module.exports = Unit;
