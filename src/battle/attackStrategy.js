function meleeAttack(attacker, target) {
  const damage = attacker.getEffectiveDamage();
  const finalDamage = Math.round(damage);

  target.currentHp -= finalDamage;

  console.log(
    `${attacker.name} атакует ${target.name} и наносит ${finalDamage} урона. ` +
      `Осталось хп у ${target.name}: ${target.currentHp}`,
  );
}

function rangeAttack(attacker, target) {
  const damage = attacker.getEffectiveDamage();
  const modifier = target.damageModifiers.takenFromRanged;
  const finalDamage = Math.round(damage * modifier);

  target.currentHp -= finalDamage;

  console.log(
    `${attacker.name} стреляет в ${target.name} и наносит ${finalDamage} урона ` +
      `(модификатор х${modifier}). ` +
      `Осталось хп у ${target.name}: ${target.currentHp}`,
  );
}

module.exports = { meleeAttack, rangeAttack };
