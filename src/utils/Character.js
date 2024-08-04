class Ability {
  constructor(name, descriptions, isPassive = false) {
    this.name = name;
    this.descriptions = descriptions;
    this.level = isPassive ? 1 : 0;
    this.isPassive = isPassive;
  }

  getDescription() {
    return this.descriptions[this.level];
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

  getLeveledUpAbilities() {
    return this.abilities.filter((ability) => ability.level >= 1);
  }
}

const warriorAbilities = [
  new Ability("Berserker Rage", [
    "Sacrifice <span style='color: red;'>30</span> HP for <span style='color: red;'>30</span> ATK bonus this turn.",
    "Sacrifice <span style='color: red;'>45</span> HP for <span style='color: red;'>45</span> ATK bonus this turn.",
    "Sacrifice <span style='color: red;'>55</span> HP for <span style='color: red;'>55</span> ATK bonus this turn.",
    "Sacrifice <span style='color: red;'>70</span> HP for <span style='color: red;'>70</span> ATK bonus this turn.",
  ]),
  new Ability("Taunt", [
    "Freezes <span style='color: red;'>1</span> closest player in place.",
    "Freezes <span style='color: red;'>2</span> closest players in place.",
    "Freezes <span style='color: red;'>3</span> closest players in place.",
    "Freezes <span style='color: red;'>4</span> closest players in place.",
  ]),
  new Ability(
    "Damage Reduction",
    [
      "<span style='color: red;'>+1</span> damage reduction.",
      "<span style='color: red;'>+2</span> damage reduction.",
      "<span style='color: red;'>+3</span> damage reduction.",
      "<span style='color: red;'>+4</span> damage reduction.",
    ],
    true
  ),
];

const wizardAbilities = [
  new Ability("Illusion", [
    "If enemy hits wrong target they become vulnerable next turn.",
    "If enemy hits wrong target they become vulnerable next turn and take <span style='color: red;'>50</span> damage.",
    "If enemy hits wrong target they become vulnerable next turn and take <span style='color: red;'>80</span> damage.",
    "If enemy hits wrong target they become vulnerable next turn and take <span style='color: red;'>100</span> damage.",
  ]),
  new Ability("Blink", [
    "Skips <span style='color: red;'>1</span> room without entering it.",
    "Skips <span style='color: red;'>2</span> room without entering it.",
    "Skips <span style='color: red;'>3</span> room without entering it.",
    "Skips <span style='color: red;'>4</span> room without entering it.",
  ]),
  new Ability(
    "Presence",
    [
      "See what's in the next room and hear players from <span style='color: red;'>1</span> room farther away.",
      "See what's in the next two rooms and hear players from <span style='color: red;'>2</span> room farther away.",
      "See what's in the next three rooms and hear players from <span style='color: red;'>3</span> room farther away.",
      "See everything in a dungeon and hear players from <span style='color: red;'>4</span> room farther away.",
    ],
    true
  ),
];

const rogueAbilities = [
  new Ability("Evade", [
    "Take no damage next <span style='color: red;'>1</span> turns.",
    "Take no damage next <span style='color: red;'>2</span> turns.",
    "Take no damage next <span style='color: red;'>3</span> turns.",
    "Take no damage for <span style='color: red;'>4</span> turns.",
  ]),
  new Ability("Vanish", [
    "Become invisible for <span style='color: red;'>30</span> seconds.",
    "Become invisible for <span style='color: red;'>40</span> seconds.",
    "Become invisible for <span style='color: red;'>50</span> seconds.",
    "Become invisible for <span style='color: red;'>60</span> seconds.",
  ]),
  new Ability(
    "Backstab",
    [
      "Guarantees first turn <span style='color: red;'>+50%</span> more damage on first attack if invisible.",
      "Guarantees first turn <span style='color: red;'>+75%</span> more damage on first attack if invisible.",
      "Guarantees first turn <span style='color: red;'>+90%</span> more damage on first attack if invisible.",
      "Guarantees first turn <span style='color: red;'>+105%</span> more damage on first attack if invisible.",
    ],
    true
  ),
];

const generalAbilities = [
  new Ability("Health", [
    "<span style='color: red;'>+1</span> extra HP.",
    "<span style='color: red;'>+2</span> extra HP.",
    "<span style='color: red;'>+3</span> extra HP.",
    "<span style='color: red;'>+4</span> extra HP.",
  ]),
  new Ability("Strength", [
    "<span style='color: red;'>+1</span> extra ATK.",
    "<span style='color: red;'>+2</span> extra ATK.",
    "<span style='color: red;'>+3</span> extra ATK.",
    "<span style='color: red;'>+4</span> extra ATK.",
  ]),
  new Ability("Pickpocketing", [
    "<span style='color: red;'>+1%</span> success chance of pickpocket attempt.",
    "<span style='color: red;'>+2%</span> success chance of pickpocket attempt.",
    "<span style='color: red;'>+3%</span> success chance of pickpocket attempt.",
    "<span style='color: red;'>+4%</span> success chance of pickpocket attempt.",
  ]),
];

export {
  Character,
  warriorAbilities,
  wizardAbilities,
  rogueAbilities,
  generalAbilities,
};

export default { Ability };
