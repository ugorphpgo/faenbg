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
  const actingSide = action.side === 'attacker' ? battle.attackSide : battle.defendSide; //проверка - чей отряд аттакует с помощью тернарного оператора
  const targetSide = action.side === 'attacker' ? battle.defendSide : battle.attackSide; // если атакуюет 'attakcker' то целью является defender

  if (action.type === 'attack') {
    const attacker = actingSide.units[action.unitIndex]; //присваем юнитам - кто аттакер а кто таргет
    const target = targetSide.units[action.targetIndex]; //для этого нам нужно знать индекс отряда

    if (!attacker || !attacker.isAlive()) {
      console.log('Аттакующего отряда не существуе или он уничтожен');
      return;
    }

    if (!target || !target.isAlive()) {
      console.log('Цели не существует или он уничтожен');
      return;
    }

    attacker.attackStrategy(attacker, target);

    if (target.currentHp <= 0) {
      // проверка - остались ли хп у армии targeta после атаки
      endTurn(battle);
    }
  } else {
    console.log('Пока что нету реализации для этого');
  }
}
//простой вывод действия определнной стороны
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

/*
Ход № 3
Ходят атакующие
light spearman атакует archer и наносит 12 урона. Осталось хп у archer: 106
Ход № 4
Ходят защищающиеся
archer стреляет в light spearman и наносит 27 урона (модификатор х1.5). Осталось хп у light spearman: 26
Ход № 5
Ходят атакующие
light spearman атакует archer и наносит 6 урона. Осталось хп у archer: 100
Ход № 6
Ходят защищающиеся
archer стреляет в light spearman и наносит 27 урона (модификатор х1.5). Осталось хп у light spearman: -1
Битва окончена - победа защищающиехся
*/
