class Ability {
  constructor(name, description, isPassive = false) {
    this.name = name;
    this.description = description;
    this.level = isPassive ? 1 : 0;
    this.isPassive = isPassive;
  }

  upgrade() {
    if (this.level < 3) {
      this.level += 1;
    }
  }
}

class Character {
  constructor(name, abilities) {
    this.name = name;
    this.abilities = abilities;
  }

  upgradeAbility(abilityName) {
    const ability = this.abilities.find((a) => a.name === abilityName);
    if (ability) {
      ability.upgrade();
    }
  }

  getAbility(abilityName) {
    return this.abilities.find((a) => a.name === abilityName);
  }
}

const warriorAbilities = [
  new Ability("Berserker Rage", "Sacrifice HP for attack bonus this turn."),
  new Ability("Taunt", "Freezes closest player(s) in place."),
  new Ability("Damage Reduction", "+1 damage reduction.", true),
];

const wizardAbilities = [
  new Ability(
    "Illusion",
    "If enemy hits wrong target they become vulnerable next turn."
  ),
  new Ability("Blink", "Skips a room without entering it (teleports)."),
  new Ability(
    "Presence",
    "See what's in the next room and hear players from farther away.",
    true
  ),
];

const rogueAbilities = [
  new Ability("Evade", "Take no damage next turn."),
  new Ability("Vanish", "Become invisible for 30 seconds."),
  new Ability(
    "Backstab",
    "Guarantees first turn +50% more damage on first attack if invisible.",
    true
  ),
];

const generalAbilities = [
  new Ability("Health", "Extra health points."),
  new Ability("Strength", "Extra attack."),
  new Ability(
    "Pickpocketing",
    "Increases success chance of pickpocket attempt."
  ),
];

export {
  Character,
  warriorAbilities,
  wizardAbilities,
  rogueAbilities,
  generalAbilities,
};
