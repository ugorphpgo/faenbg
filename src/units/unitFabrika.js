//Прочитал про  то кан создавать новые объекты с использованием фабричных функций
const Unit = require('./Unit');
const unitTemplates = require('./UnitTemplates');

function createUnit(templateName) {
  //Создание  юнита по имени шаблона из UnitTemplates
  const template = unitTemplates[templateName];

  if (!template) {
    throw new console.error(`Не тип юнита "${templateName} "`);
  }

  const unit = new Unit(
    template.name,
    template.hp,
    template.damage,
    template.morale,
    template.speed,
    template.unitType,
  );
  //модификатор урона
  unit.damageModifiers = { ...template.damageModifiers };
  unit.abilities = [...template.abilities];
  unit.attackStrategy = template.attackStrategy;

  return unit;
}

module.exports = createUnit;
