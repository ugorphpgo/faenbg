const Army = require('./src/army/ArmyBuilder');
const createUnit = require('./src/units/unitFabrika'); //подключаем классы

let turn = 0;
const STATE = {
  /*три состояния  -  
  подготвка(до начала битвы)
  битва
  конец битвы*/
  preparation: 'preparation',
  battle: 'battle',
  finished: 'finished',
};

function createBattle(attackSide, defendSide) {
  return {
    attackSide,
    defendSide,
    state: STATE.preparation,
    currentTurn: 'attacker', // ход начинает аттакующая сторона - для создания битвы нужны две армии
  };
}

function startBattle(battle) {
  // cтарт битвы
  if (battle.state !== STATE.preparation) {
    console.log('битва уже идёт или завершена');
    return;
  }
  battle.state = STATE.battle;
  turn++;

  console.log('Начало битвы');
  console.log(`Ход № ${turn}`);
  console.log('Ходят атакующие');
}

//конец битвы
function endTurn(battle) {
  if (battle.state !== STATE.battle) {
    // проверяем - есть ли сейчас битва чтобы закончить ход
    console.log('битвы сейчас нет - завершить ход нельщя');
    return;
  }

  // проверка наличия войск благодаря методу hasAliveUnits
  if (!battle.attackSide.hasAliveUnits()) {
    battle.state = STATE.finished;
    console.log('Битва окончена - победа защищающиехся');
    return;
  }

  if (!battle.defendSide.hasAliveUnits()) {
    battle.state = STATE.finished;
    console.log('Битва окончена - победа аттакующих');
    return;
  }
  turn++;
  console.log(`Ход № ${turn}`);
  // Меняем ход

  if (battle.currentTurn === 'attacker') {
    battle.currentTurn = 'defender';
    console.log('Ходят защищающиеся');
  } else {
    battle.currentTurn = 'attacker';
    console.log('Ходят атакующие');
  }
}

function command(battle, action) {
  // прототип действий
  // пока проверка на то что бой идет и действие делает тот игрок чей ход сейчас
  if (battle.state !== STATE.battle) {
    console.log('нельзя совершать действия до начала битвы');
    return;
  }

  // проверяем - может ли эта сторого действовать в этом ходе
  if (action.side !== battle.currentTurn) {
    console.log(`вы не можете делать действия во время чужого хода `);
    return;
  }
  //простой вывод действия определнной стороны
  console.log(`[${action.side}] : ${action.type}`);
}

function main() {
  //функция main-  тут воюем - продемонстрировано создание армии с отрядами и переход хода

  const attackSide = new Army('attacker');
  attackSide.addUnit(createUnit('light_spearman')); //добавляем отряд в армию и создаем армию аттакера

  const defendSide = new Army('defender');
  defendSide.addUnit(createUnit('heavy_spearman')); //добавляем отряд в армию и создаем армию аттакера

  const battle = createBattle(attackSide, defendSide);
  console.log('проверка состояния после создания битвы:', battle.state); // создание битвы

  // начало битвы
  startBattle(battle);
  console.log('проверка состояния после старта битвы:', battle.state); // battle

  //проверяем команды на вывод в консоль при неправильной стороне  для действия у каждой стороны после endTurn
  command(battle, { side: 'defender', type: 'двигает отряд' });
  command(battle, { side: 'attacker', type: 'двигает отряд' });
  endTurn(battle);

  command(battle, { side: 'attacker', type: 'двигает отряд' });
  command(battle, { side: 'defender', type: 'атакует' });
  endTurn(battle);

  command(battle, { side: 'attacker', type: 'атакует' });
  command(battle, { side: 'defender', type: 'атакует' });
  endTurn(battle);
  console.log('проверка состояния:', battle.state); // battle — бой продолжается - пока юниты есть у армий
}

main();

/*
проверка состояния после создания битвы: preparation
Начало битвы
Ход № 1
Ходят атакующие
проверка состояния после старта битвы: battle
вы не можете делать действия во время чужого хода
[attacker] : двигает отряд
Ход № 2
Ходят защищающиеся
вы не можете делать действия во время чужого хода
[defender] : атакует
Ход № 3
Ходят атакующие
[attacker] : атакует
вы не можете делать действия во время чужого хода
Ход № 4
Ходят защищающиеся
проверка состояния: battle
*/
