"use client";

import { useState } from "react";
import { ChevronsUp, Wand, Sword, Axe } from "lucide-react";
import {
  Character,
  warriorAbilities,
  wizardAbilities,
  rogueAbilities,
  generalAbilities,
} from "@/utils/Character";
import { Chip, Button, Tooltip, useDisclosure } from "@nextui-org/react";
import SkillOverlay from "@/components/SkillOverlay";

const Home = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [level, setLevel] = useState(1);
  const [points, setPoints] = useState(0);
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  const warrior = new Character("Warrior", [
    ...warriorAbilities,
    ...generalAbilities,
  ]);

  const wizard = new Character("Wizard", [
    ...wizardAbilities,
    ...generalAbilities,
  ]);
  const rogue = new Character("Rogue", [
    ...rogueAbilities,
    ...generalAbilities,
  ]);

  const characters = {
    warrior,
    wizard,
    rogue,
  };

  const handleLevelUp = () => {
    if (level < 10) {
      setLevel(level + 1);
      setPoints(points + (level === 9 ? 2 : 1)); // 2 points at level 10
    }
  };

  const showOverlay = (character) => {
    setSelectedCharacter(characters[character]);
    onOpen();
  };

  const closeOverlay = () => {
    setSelectedCharacter(null);
  };

  const upgradeAbility = (abilityName) => {
    if (points > 0 && selectedCharacter.getAbility(abilityName).level < 3) {
      selectedCharacter.upgradeAbility(abilityName);
      setPoints(points - 1);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen">
      <div className="container">
        <h1 className="text-center text-xl font-semibold border-b-1 border-b-slate-200 py-4 mb-4">
          RPG Game Test
        </h1>
        <div className="flex justify-center items-center gap-4">
          <Chip variant="flat" color="primary">
            Level: {level}
          </Chip>
          <Chip variant="flat" color="secondary">
            Remaining points: {points}
          </Chip>
          <Tooltip content="Level up">
            <Button
              isIconOnly
              size="sm"
              onClick={handleLevelUp}
              color="warning"
              radius="full"
              isDisabled={level === 10}
            >
              <ChevronsUp size={16} />
            </Button>
          </Tooltip>
        </div>

        <h1 className="text-center py-5">Select class to level up skills</h1>

        <div className="flex flex-col justify-between items-center gap-2">
          <Button
            radius="none"
            className="w-full border-2 border-black"
            onClick={() => showOverlay("warrior")}
            endContent={<Axe size={16} />}
          >
            Warrior
          </Button>
          <Button
            radius="none"
            className="w-full border-2 border-black"
            onClick={() => showOverlay("wizard")}
            endContent={<Wand size={16} />}
          >
            Wizard
          </Button>
          <Button
            radius="none"
            className="w-full border-2 border-black"
            onClick={() => showOverlay("rogue")}
            endContent={<Sword size={16} />}
          >
            Rogue
          </Button>
        </div>

        <SkillOverlay
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          character={selectedCharacter}
          upgradeAbility={upgradeAbility}
          points={points}
        />
      </div>

      <div className="container mt-10">
        <p className="text-center">
          Created by{" "}
          <a
            href="https://github.com/hieudm-7998"
            target="_blank"
            className="underline"
          >
            @hieudm-7998
          </a>
        </p>
        <p className="text-center">
          My portfolio:
          <a
            href="https://hews-portfolio.vercel.app/"
            target="_blank"
            className="underline ms-1"
          >
            https://hews-portfolio.vercel.app/
          </a>
        </p>
      </div>
    </div>
  );
};

export default Home;
