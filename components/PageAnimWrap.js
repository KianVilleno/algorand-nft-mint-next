import React from "react";
import { motion } from "framer-motion";
import animationVariants from "../utils/animationVariants";

const PageAnimWrap = ({ motionKey, children }) => {
  return (
    <motion.div
      initial="initial"
      animate="enter"
      exit="exit"
      variants={animationVariants()}
      key={motionKey}
    >
      {children}
    </motion.div>
  );
};

export default PageAnimWrap;
