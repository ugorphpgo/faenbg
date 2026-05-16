import { ArmyBuilder } from './src/army/index.js';
import { createUnit } from './src/units/index.js';
import { createBattle, command, startBattle, endTurn } from './src/battle/index.js';
function main() {
  //функция main-  тут воюем - продемонстрировано создание армии с отрядами и переход хода

  const attackSide = new ArmyBuilder('attacker');
  attackSide.addUnit(createUnit('light_spearman'), 0, 0); //добавляем отряд в армию и создаем армию аттакера

  const defendSide = new ArmyBuilder('defender');
  defendSide.addUnit(createUnit('archer'), 5, 5); //добавляем отряд в армию и создаем армию аттакера

  const battle = createBattle(attackSide, defendSide);
  console.log('проверка состояния после создания битвы:', battle.state); // создание битвы

  // начало битвы
  startBattle(battle);
  console.log('проверка состояния после старта битвы:', battle.state); // battle

  //проверяем команды на вывод в консоль при неправильной стороне для действия у каждой стороны после endTurn
  command(battle, {
    side: 'attacker',
    type: 'attack',
    unitIndex: 0, // легкий копейщик атакует лучника
    targetIndex: 0,
  });
  endTurn(battle);

  command(battle, {
    side: 'defender',
    type: 'move',
    unitIndex: 0, // лучник двигается
    moveTo: { x: 4, y: 4 },
  });
  endTurn(battle);

  command(battle, {
    side: 'attacker',
    type: 'move',
    unitIndex: 0, // лучник двигается
    moveTo: { x: 2, y: 2 },
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
    type: 'move',
    unitIndex: 0, // лучник двигается
    moveTo: { x: 2, y: 6 },
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
