"use client";

import { cn } from "@/libs/utils";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

function Hero() {
  // Animation variants for the boxes
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const boxVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.9,
    },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

  // Animation variants for the heading text
  const textVariants = {
    hidden: { opacity: 0, x: -20 },
    show: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="relative flex h-full pb-[91px] flex-col lg:flex-row items-center justify-between max-w-screen-2xl mx-auto">
      <motion.div
        className="uppercase font-aktiv-bold font-extrabold lg:text-[52px] md:text-[36px] text-[31px]"
        initial="hidden"
        animate="show"
        variants={{
          hidden: { opacity: 0 },
          show: {
            opacity: 1,
            transition: {
              staggerChildren: 0.2,
            },
          },
        }}
      >
        <motion.ul
          className="flex gap-1 font-normal"
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
                delayChildren: 0.1,
              },
            },
          }}
        >
          {["Multichain", "BNB", "ETH", "Base"].map((token, index) => (
            <motion.li
              key={index}
              variants={{
                hidden: { opacity: 0, y: -10 },
                show: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    type: "spring",
                    stiffness: 200,
                  },
                },
              }}
              className={cn(
                "lg:text-[12.26px] text-[10px] font-aktiv-regular lg:rounded-full lg:mt-[80px] md:mt-[43px] mt-[27px] bg-white/[0.08] text-white/[0.56] rounded-[55px] px-[9.5px] lg:py-[5.5px] py-1 flex justify-center gap-[5px] items-center",
                index === 0 && "bg-white/[0.24]"
              )}
            >
              {token}
            </motion.li>
          ))}
        </motion.ul>
        <motion.h1 variants={textVariants}>Track the leading</motion.h1>
        <motion.h1
          variants={textVariants}
          className="text-[#FFD238] flex items-center justify-start gap-[8px]"
        >
          memecoin
          <Image
            alt="min"
            src="/hero-g1.svg"
            width={"500"}
            height={"300"}
            className="lg:w-[170px] md:h-[40px] h-[26px]"
          />
        </motion.h1>
        <motion.h1 variants={textVariants}>traders in real time</motion.h1>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, type: "spring", stiffness: 100 }}
        >
          <Link href="/trades">
            <button className="bg-white hover:bg-white/80 md:mt-[36px] mt-[25px] text-[16px] font-medium text-[#000] rounded-[80px] px-[20px] py-[10px] lg:px-[42px] lg:py-[17px] transition-all duration-300 hover:scale-105">
              Get started
            </button>
          </Link>
        </motion.div>
      </motion.div>

      {/* Desktop boxes */}
      <motion.div
        id="boxes"
        className="relative md:block hidden h-[423px] mt-[47px] w-[505px] lg:grid grid-cols-2 grid-rows-2 gap-2"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <motion.div
          className="bg-[#4A4A4A] row-span-1 rounded-[20px] h-full flex items-center justify-center"
          variants={boxVariants}
          whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
        >
          <Image alt="hero" src="/bsc.svg" width={100} height={100} />
        </motion.div>
        <motion.div
          className="bg-[#0052FF] row-span-2 rounded-[20px] h-full flex items-center justify-center"
          variants={boxVariants}
          whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
        >
          <Image alt="hero" src="/base.svg" width={100} height={100} />
        </motion.div>
        <motion.div
          className="bg-[#627EEA] row-span-1 rounded-[20px] flex items-center justify-center"
          variants={boxVariants}
          whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
        >
          <Image alt="hero" src="/eth.svg" width={100} height={100} />
        </motion.div>
      </motion.div>

      {/* Mobile boxes */}
      <motion.div
        id="boxes"
        className="relative grid lg:hidden h-[305px] w-full grid-cols-2 grid-rows-2 gap-2 mt-[54px]"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <motion.div
          className="bg-[#4A4A4A] row-span-1 rounded-[20px] h-full flex items-center justify-center"
          variants={boxVariants}
          // whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
          whileTap={{ scale: 0.95 }}
        >
          <Image alt="hero" src="/bsc.svg" width={100} height={100} />
        </motion.div>
        <motion.div
          className="bg-[#0052FF] row-span-2 rounded-[20px] h-full flex items-center justify-center"
          variants={boxVariants}
          // whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
          whileTap={{ scale: 0.95 }}
        >
          <Image alt="hero" src="/base.svg" width={100} height={100} />
        </motion.div>
        <motion.div
          className="bg-[#627EEA] row-span-1 rounded-[20px] flex items-center justify-center"
          variants={boxVariants}
          // whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
          whileTap={{ scale: 0.95 }}
        >
          <Image alt="hero" src="/eth.svg" width={100} height={100} />
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Hero;
