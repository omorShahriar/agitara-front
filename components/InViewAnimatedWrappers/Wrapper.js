"use client";
import { motion } from "framer-motion";

import {
  blockFadeInRight,
  blockFadeInTop,
  blockFadeInLeft,
  blockFadeIn,
  gridVariants,
  gridElementVariants,
} from "@/animation/variants";

export const FadeInWrapper = ({ children }) => {
  return (
    <motion.div
      variants={blockFadeIn}
      initial="hidden"
      whileInView="visible"
      className=""
    >
      {children}
    </motion.div>
  );
};
export const GridFadeInWrapper = ({ children }) => {
  return (
    <motion.div
      variants={gridVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="grid grid-cols-12 md:gap-16 gap-8"
    >
      {children}
    </motion.div>
  );
};
export const GridElementWrapper = ({ children }) => {
  return (
    <motion.div
      variants={gridElementVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="col-span-12 md:col-span-3"
    >
      {children}
    </motion.div>
  );
};
export const FadeInRightWrapper = ({ children }) => {
  return (
    <motion.div
      variants={blockFadeInRight}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className=""
    >
      {children}
    </motion.div>
  );
};
export const FadeInTopWrapper = ({ children }) => {
  return (
    <motion.div
      variants={blockFadeInTop}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className=""
    >
      {children}
    </motion.div>
  );
};
export const FadeInLeftWrapper = ({ children }) => {
  return (
    <motion.div
      variants={blockFadeInLeft}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className=""
    >
      {children}
    </motion.div>
  );
};
