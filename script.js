const prepare = () => {
  //Подготовка к битве
  const mapType = MAP_TYPE.PLAINS_ONE;
  const attackSide = armyBuilder();
  const defendSide = armyBuilder();

  const battle = createBattle({
    //Битва
    mapType,
    attackSide,
    defendSide,
  });
};
//Класс отвечающий за игровой цикл
class Game {
  troops = Array();
}
//класс отряда
class Troop {
  max_hp;
  hp;
  steps;
  constructor(max_hp = 100, max_steps = 2) {
    this.max_hp = max_hp;
    this.hp = max_hp;
    this.steps = max_steps;
    this.max_steps = max_steps;
  }
  step() {}
}
