const Army = require('./src/army/ArmyBuilder');
const createUnit = require('./src/units/unitFabrika');
const { createBattle, command, startBattle, endTurn } = require('./src/battle/battle');
function main() {
  //функция main-  тут воюем - продемонстрировано создание армии с отрядами и переход хода

  const attackSide = new Army('attacker');
  attackSide.addUnit(createUnit('light_spearman')); //добавляем отряд в армию и создаем армию аттакера

  const defendSide = new Army('defender');
  defendSide.addUnit(createUnit('archer')); //добавляем отряд в армию и создаем армию аттакера

  const battle = createBattle(attackSide, defendSide);
  console.log('проверка состояния после создания битвы:', battle.state); // создание битвы

  // начало битвы
  startBattle(battle);
  console.log('проверка состояния после старта битвы:', battle.state); // battle

  //проверяем команды на вывод в консоль при неправильной стороне  для действия у каждой стороны после endTurn
  command(battle, {
    side: 'attacker',
    type: 'attack',
    unitIndex: 0, // легкий копейщик атакует лучника
    targetIndex: 0,
  });
  endTurn(battle);

  command(battle, {
    side: 'defender',
    type: 'attack',
    unitIndex: 0, // лучник атакуетл егкий копейщик
    targetIndex: 0,
  });
  endTurn(battle);

  command(battle, {
    side: 'attacker',
    type: 'attack',
    unitIndex: 0, // легкий копейщик атакует лучника
    targetIndex: 0,
  });
  endTurn(battle);

  command(battle, {
    side: 'defender',
    type: 'attack',
    unitIndex: 0, // лучник атакуетл егкий копейщик
    targetIndex: 0,
  });
  endTurn(battle);
  command(battle, {
    side: 'attacker',
    type: 'attack',
    unitIndex: 0, // легкий копейщик атакует лучника
    targetIndex: 0,
  });
  endTurn(battle);

  command(battle, {
    side: 'defender',
    type: 'attack',
    unitIndex: 0, // лучник атакуетл егкий копейщик
    targetIndex: 0,
  });
}

main();
