const { meleeAttack, rangeAttack } = require('../battle/attackStrategy');
const unitTemplates = {
  light_spearman: {
    name: 'light spearman',
    hp: 80,
    speed: 3,
    morale: 85,
    damage: 12,
    unitType: 'spearman',
    damageModifiers: {
      takenFromRanged: 1.5,
    }, //  Осоновые характеристики - и модификатор урона который был пропсан
    abilities: ['close_ranks'],
    attackStrategy: meleeAttack,
  },
  heavy_spearman: {
    name: 'heavy spearman',
    hp: 160,
    speed: 1,
    morale: 110,
    damage: 18,
    unitType: 'spearman',
    damageModifiers: {
      takenFromRanged: 0.5,
    }, //  Осоновые характеристики - и модификатор урона который был прописан
    abilities: ['close_ranks'],
    attackStrategy: meleeAttack,
  },
  archer: {
    name: 'archer',
    hp: 130,
    speed: 1,
    morale: 110,
    damage: 18,
    unitType: 'range',
    damageModifiers: {
      takenFromRanged: 0.5,
    }, //  Осоновые характеристики - и модификатор урона который был прописан
    abilities: ['close_ranks'],
    attackStrategy: rangeAttack,
  },
};

module.exports = unitTemplates;
