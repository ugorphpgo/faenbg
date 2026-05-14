// Создаем класс army
class ArmyBuilder {
  constructor(side) {
    // Чья армия — нападающего или защищающегося
    this.side = side;

    // Список отрядов в армии
    this.units = [];
  }

  // Добавить отряд в армию
  addUnit(unit, x, y) {
    this.units.push(unit);
    unit.position = { x, y };
  }

  // Провека  — есть ли ещё живые отряды c помощью метода some.
  // Проверяем с помощью методов unit - живи ли отряды и не сбежали ли они
  hasAliveUnits() {
    return this.units.some((unit) => unit.isAlive() && !unit.isRouting());
  }
}

module.exports = ArmyBuilder;
