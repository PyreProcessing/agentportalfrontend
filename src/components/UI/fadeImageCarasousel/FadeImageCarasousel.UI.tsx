'use client';
import React from 'react';
import styles from './FadeImageCarasousel.module.scss';
import { AnimatePresence, motion } from 'framer-motion';

type FadeImageCarasouselProps = {
  children?: React.ReactNode;
  images: Array<{ image: string; alt: string }>;
  className?: string;
  transitionType?: 'fade' | 'jump' | 'slide' | 'scale';
  duration?: number;
  type?: 'whileInView' | 'whileHover' | 'whileDrag' | 'whileFocus' | 'whileTap';
};

const FadeImageCarasousel = ({
  children,
  images,
  className,
  transitionType,
  duration,
  type,
}: FadeImageCarasouselProps) => {
  const variants = {
    fade: {
      visible: { opacity: 1 },
      hidden: { opacity: 0 },
      transition: { duration: duration ?? 1 },
      exit: { opacity: 0 },
    },
    jump: {
      visible: { y: 0 },
      hidden: { y: 500 },
      transition: { duration: duration ?? 1 },
      exit: { y: 500 },
    },
    slide: {
      visible: { x: 0 },
      hidden: { x: 500 },
      transition: { duration: duration ?? 1 },
      exit: { x: 500 },
    },
    scale: {
      hidden: { scale: 0 },
      visible: { scale: 1 },
      transition: { duration: duration ?? 1 },
      exit: { scale: 0 },
    },
  } as any;

  const randomVariant = () => {
    const variants = ['fade', 'jump', 'slide', 'scale'];
    return variants[Math.floor(Math.random() * variants.length)] as any;
  };
  const [carouselIndex, setCarouselIndex] = React.useState(0);
  // setup, useEffect and time interval
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCarouselIndex(carouselIndex + 1);
    }, duration ?? 5000);
    return () => clearInterval(interval);
  }, [carouselIndex]);
  // we want to set a selected variant based on the transitionType, but also on
  // random if it's true, if it's true we want to select a random variant
  // we also want to select a random variant if the transitionType is not valid or missing
  const selectedVariant = transitionType
    ? variants[transitionType]
    : variants[randomVariant()];

  // if only one image, animate it in
  if (images.length === 1) {
    return (
      <motion.img
        variants={selectedVariant}
        className={
          className ? `${styles.container} ${className}` : styles.container
        }
        key={`carousel-${images[0].alt}`}
        src={images[0].image}
        alt={images[0].alt}
      >
        {children}
      </motion.img>
    );
  }

  // otherwise we have several images to animate
  return (
    <AnimatePresence mode="wait">
      <motion.img
        initial={'hidden'}
        exit={'exit'}
        variants={selectedVariant}
        key={`carousel-${carouselIndex}`}
        src={images[carouselIndex % images.length].image}
        alt={images[carouselIndex % images.length].alt}
        whileInView={type === 'whileInView' ? 'visible' : undefined}
        whileHover={type === 'whileHover' ? 'visible' : undefined}
        whileDrag={type === 'whileDrag' ? 'visible' : undefined}
        whileFocus={type === 'whileFocus' ? 'visible' : undefined}
        whileTap={type === 'whileTap' ? 'visible' : undefined}
        viewport={{ once: true }}
        className={
          className ? `${styles.container} ${className}` : styles.container
        }
      >
        {children}
      </motion.img>
    </AnimatePresence>
  );
};

export default FadeImageCarasousel;
