"use client";

import { useState } from "react";
import { ChevronsUp, Wand, Sword, Axe, Swords, Check } from "lucide-react";
import {
  Character,
  warriorAbilities,
  wizardAbilities,
  rogueAbilities,
  generalAbilities,
} from "@/utils/Character";
import { Chip, Button, Tooltip, useDisclosure, Input } from "@nextui-org/react";
import SkillOverlay from "@/components/SkillOverlay";
import MySkill from "@/components/MySkill";
import CharacterModel from "@/assets/character.gif";

const Home = () => {
  const SkillOverlayModal = useDisclosure();
  const MySkillModal = useDisclosure();

  const [level, setLevel] = useState(1);
  const [points, setPoints] = useState(0);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [characterName, setCharacterName] = useState("Player");
  const [isUserChangeName, setIsUserChangeName] = useState(false);

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
      setPoints(points + (level === 9 ? 2 : 1));
    }
  };

  const showOverlay = (char) => {
    setSelectedCharacter(characters[char]);
    SkillOverlayModal.onOpen();
  };

  const upgradeAbility = (ability) => {
    if (points > 0 && selectedCharacter.getAbility(ability).level < 3) {
      selectedCharacter.upgradeAbility(ability);
      setPoints(points - 1);
    }
  };

  const getAllLeveledUpSkills = () => {
    const allSkills = [
      ...warrior.getLeveledUpAbilities(),
      ...wizard.getLeveledUpAbilities(),
      ...rogue.getLeveledUpAbilities(),
    ];

    const mergedSkills = allSkills.reduce((acc, skill) => {
      const existingSkill = acc.find((s) => s.name === skill.name);
      if (existingSkill) {
        existingSkill.level = Math.max(existingSkill.level, skill.level);
      } else {
        acc.push(skill);
      }
      return acc;
    }, []);

    return mergedSkills;
  };

  const handlePlayerNameChange = () => {
    setIsUserChangeName(true);
  };

  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen">
      <div className="container relative">
        <div className="flex justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <Tooltip content="Level up">
              <Button
                isIconOnly
                size="sm"
                onClick={handleLevelUp}
                color="primary"
                radius="full"
                isDisabled={level === 10}
              >
                <ChevronsUp size={16} />
              </Button>
            </Tooltip>
            <Chip variant="flat" color="primary">
              Level: {level}
            </Chip>
          </div>
          <div className="flex items-center gap-4">
            <Chip variant="flat" color="secondary">
              Remaining points: {points}
            </Chip>
            <Tooltip content="My skills">
              <Button
                isIconOnly
                size="sm"
                color="secondary"
                radius="full"
                onClick={() => MySkillModal.onOpen()}
              >
                <Swords size={16} />
              </Button>
            </Tooltip>
          </div>
        </div>

        <div className="my-10">
          <img
            className="w-20 block mx-auto"
            src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/9dce1ca9-f016-4a03-807e-76b69302d637/dag02az-5437ed09-16d1-42c6-9d61-7d27dc0cd6ec.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzlkY2UxY2E5LWYwMTYtNGEwMy04MDdlLTc2YjY5MzAyZDYzN1wvZGFnMDJhei01NDM3ZWQwOS0xNmQxLTQyYzYtOWQ2MS03ZDI3ZGMwY2Q2ZWMuZ2lmIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.7LxXh3e1k8wTaBwPoQCkeh2oHKHxOzkuDwrT8H6k4sw"
            alt=""
          />
          {isUserChangeName ? (
            <div className="flex items-center justify-center gap-2">
              <Input
                isClearable
                size="sm"
                className="w-1/3"
                value={characterName}
                onValueChange={setCharacterName}
              />
              <Button
                isIconOnly
                size="sm"
                isDisabled={characterName === ""}
                onClick={() => setIsUserChangeName(false)}
              >
                <Check />
              </Button>
            </div>
          ) : (
            <Tooltip content="Click to change name." placement="bottom">
              <button
                className="block mx-auto"
                onClick={() => handlePlayerNameChange()}
              >
                {characterName}
              </button>
            </Tooltip>
          )}
        </div>

        {points !== 0 && (
          <div className="p-3 rounded border-1 border-red-400 my-10 absolute w-full left-0 top-0 bg-white animate-bounce">
            <div className="mb-5">
              <Chip
                variant="bordered"
                color="danger"
                className="bg-red-500 flex items-center justify-center mx-auto uppercase"
              >
                <span className="font-bold text-white">
                  level up !!!
                </span>
              </Chip>
              <h1 className="text-center text-red-400 italic">
                Select class to level up skills:
              </h1>
            </div>
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
          </div>
        )}

        <SkillOverlay
          isOpen={SkillOverlayModal.isOpen}
          onOpenChange={SkillOverlayModal.onOpenChange}
          character={selectedCharacter}
          upgradeAbility={upgradeAbility}
          points={points}
        />

        <MySkill
          isOpen={MySkillModal.isOpen}
          onOpenChange={MySkillModal.onOpenChange}
          leveledUpSkills={getAllLeveledUpSkills()}
        />
      </div>

      <div className="container">
        <h1 className="text-center text-xl font-semibold border-t-1 border-t-slate-200 py-4 mt-4">
          RPG Game Test
        </h1>
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
