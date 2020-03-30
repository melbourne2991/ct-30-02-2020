import React, { useState } from "react";
import { Layout } from "./components/Layout";
import { ThemeProvider } from "emotion-theming";

import { theme } from "./theme";
import { Hero } from "./components/Hero";

import { SignUp } from "./SignUp";
import { Modal, modalMountPointRef } from "./components/Modal";
import { AnimatePresence } from "framer-motion";

export const App = () => {
  const [showSignUpModalState, setShowSignUpModal] = useState(false);

  return (
    <ThemeProvider theme={theme}>
      <Layout ref={modalMountPointRef}>
        <Hero onClickCta={() => setShowSignUpModal(true)}></Hero>

        {/* <AnimatePresence> */}
        {showSignUpModalState && (
          <Modal onClickOverlay={() => setShowSignUpModal(false)}>
            <SignUp onSignUpComplete={() => setShowSignUpModal(false)}></SignUp>
          </Modal>
        )}
        {/* </AnimatePresence> */}
      </Layout>
    </ThemeProvider>
  );
};
