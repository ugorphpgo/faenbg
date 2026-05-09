const unitTemplates = {
  light_spearman: {
    name: 'light spearman',
    hp: 80,
    speed: 3,
    morale: 85,
    damage: 12,
    unitType: 'spearman',
    damageMultipliers: {
      fromRanged: 1.5,
    }, //  Осоновые характеристики - и модификатор урона который был пропсан
    abilities: ['close_ranks'],
  },
  heavy_spearman: {
    name: 'heavy spearman',
    hp: 160,
    speed: 1,
    morale: 110,
    danage: 18,
    unitType: 'spearman',
    damageMultipliers: {
      fromRanged: 0.5,
    }, //  Осоновые характеристики - и модификатор урона который был прописан
    abilities: ['close_ranks'],
  },
};

module.exports = unitTemplates;
