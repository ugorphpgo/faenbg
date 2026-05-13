function meleeAttack(attacker, target) {
  //функция аттаки для мили ( без модификаторов)
  const damage = attacker.getEffectiveDamage(); //записываем в урон значение эффективного урона(если армия меньше 50%)
  const finalDamage = Math.round(damage); //округление до целого числа

  target.currentHp -= finalDamage; // подсчет хп

  console.log(
    `${attacker.name} атакует ${target.name} и наносит ${finalDamage} урона. ` +
      `Осталось хп у ${target.name}: ${target.currentHp}`,
  );
}

function rangeAttack(attacker, target) {
  //функция аттаки для ренж  - отдельная из-за модификатора
  const damage = attacker.getEffectiveDamage();
  const modifier = target.damageModifiers.takenFromRanged;
  const finalDamage = Math.round(damage * modifier); //cчитаем урон умножая на модификатор

  target.currentHp -= finalDamage;

  console.log(
    `${attacker.name} стреляет в ${target.name} и наносит ${finalDamage} урона ` +
      `(модификатор х${modifier}). ` +
      `Осталось хп у ${target.name}: ${target.currentHp}`,
  );
}

module.exports = { meleeAttack, rangeAttack };
