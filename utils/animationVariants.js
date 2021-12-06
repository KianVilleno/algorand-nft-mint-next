const animationVariants = (options = {}) => {
  return {
    initial: { y: 50, opacity: 0 },
    enter: {
      y: 0,
      opacity: 1,
      transition: {
        delay: options.delay ? options.delay : 0.5,
        duration: 0.5,
        ease: [0.48, 0.15, 0.25, 0.96],
      },
    },
    exit: {
      y: 100,
      opacity: 0,
      transition: { duration: 0.2, ease: [0.48, 0.15, 0.25, 0.96] },
    },
  };
};

export default animationVariants;
