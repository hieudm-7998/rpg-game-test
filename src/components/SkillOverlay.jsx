import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Chip,
} from "@nextui-org/react";
import { Plus } from "lucide-react";

const SkillOverlay = ({
  isOpen,
  onOpenChange,
  character,
  upgradeAbility,
  points,
}) => {
  console.log(character);
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} hideCloseButton>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex justify-between items-center gap-2">
              <h1 className="font-semibold text-2xl">{character.name}</h1>
              <Chip size="sm">Remaining points: {points}</Chip>
            </ModalHeader>
            <ModalBody>
              {character.abilities.map((ability) => (
                <div
                  key={ability.name}
                  className="border-b-1 border-b-slate-300 pb-2 mb-2"
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <h1 className="font-semibold text-lg">{ability.name}</h1>
                      {ability.level !== 0 && (
                        <Chip
                          size="sm"
                          color={ability.level === 3 ? "danger" : "success"}
                        >
                          {ability.level === 3 ? "MAX" : `+${ability.level}`}
                        </Chip>
                      )}
                    </div>
                    <div className="flex items-center gap-4">
                      {ability.isPassive && <Chip size="sm">Passive</Chip>}
                      <Button
                        size="sm"
                        isIconOnly
                        className="rounded-full"
                        onClick={() => upgradeAbility(ability.name)}
                        isDisabled={points === 0 || ability.level === 3}
                      >
                        <Plus />
                      </Button>
                    </div>
                  </div>
                  <div>
                    <p>{ability.description}</p>
                  </div>
                </div>
              ))}
            </ModalBody>
            <ModalFooter className="flex justify-center items-center">
              <Button onPress={onClose}>
                Close
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default SkillOverlay;
