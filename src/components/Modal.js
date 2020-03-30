import React from "react";
import { createPortal } from "react-dom";
import { Flex, Box } from "rebass";
import { motion, AnimatePresence } from "framer-motion";

export const modalMountPointRef = React.createRef(null);

const MotionBox = motion.custom(Box);
const MotionFlex = motion.custom(Flex);

const fixedFullScreen = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0
};

export const ModalOverlay = props => {
  return (
    <Flex
      sx={{
        ...fixedFullScreen
      }}
      {...props}
      flex={1}
      backgroundColor={"overlay"}
    />
  );
};

export const Modal = ({ children, onClickOverlay }) => {
  return (
    modalMountPointRef.current &&
    createPortal(
      <Flex
        sx={{
          ...fixedFullScreen
        }}
        justifyContent="center"
        alignItems="center"
      >
        <ModalOverlay onClick={onClickOverlay}></ModalOverlay>

        <Box
          onClick={e => {
            e.stopPropagation();
          }}
          sx={{
            zIndex: 1000
          }}
          width={[0.9, 450, 450]}
          justifyContent={"center"}
          flexDirection="row"
          initial="hidden"
          animate="show"
          exit="hidden"
          transition={{ duration: 0.1 }}
          variants={{
            hidden: {
              scale: 0.6
            },
            show: {
              scale: 1
            }
          }}
        >
          {children}
        </Box>
      </Flex>,
      modalMountPointRef.current
    )
  );
};
