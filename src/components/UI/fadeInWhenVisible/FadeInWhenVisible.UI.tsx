'use client';
import React from 'react';
import { motion } from 'framer-motion';

type FadeInWhenVisibleProps = {
  children: React.ReactNode;
  className?: string;
  duration?: number;
};
const FadeInWhenVisible = ({
  children,
  className,
  duration,
}: FadeInWhenVisibleProps) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ duration: duration ?? 1 }}
      variants={{
        visible: { opacity: 1 },
        hidden: { opacity: 0 },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default FadeInWhenVisible;
