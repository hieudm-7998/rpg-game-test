import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Chip,
} from "@nextui-org/react";

const MySkill = ({ isOpen, onOpenChange, leveledUpSkills }) => {
  return (
    <Modal
      backdrop="blur"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      scrollBehavior="inside"
      placement="center"
      hideCloseButton
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex justify-center items-center gap-2">
              <h1 className="font-semibold text-2xl">My skills</h1>
            </ModalHeader>
            <ModalBody>
              {leveledUpSkills.map((ability) => (
                <div
                  key={ability.name}
                  className="border-b-1 border-b-slate-300 pb-2 mb-2 flex justify-between gap-2"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <h1 className="font-semibold text-lg">{ability.name}</h1>
                      <Chip
                        size="sm"
                        color={ability.level === 3 ? "danger" : "success"}
                        className="text-white"
                      >
                        {ability.level === 3 ? "MAX" : `+${ability.level}`}
                      </Chip>
                    </div>
                    <span
                      dangerouslySetInnerHTML={{
                        __html: ability.getDescription(),
                      }}
                    ></span>
                  </div>
                  <span>
                    {ability.isPassive && <Chip size="sm">Passive</Chip>}
                  </span>
                </div>
              ))}
            </ModalBody>
            <ModalFooter className="flex justify-center items-center">
              <Button onPress={onClose}>Close</Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default MySkill;
