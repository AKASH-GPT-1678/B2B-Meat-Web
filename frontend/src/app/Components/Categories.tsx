import React from 'react'
import Image from 'next/image'
import { Foods } from "../../../assets/categories/asset";
import { useRouter } from 'next/navigation';
import { motion } from "framer-motion"
export const Categories = () => {
  const router = useRouter();
  //@ts-ignore
  const searchParams = new URLSearchParams(window.location?.search);
  function setParams(param: string) {

    searchParams.set('type', param);
    const newPathname = `${"/category"}?${searchParams.toString()}`;
    router.push(newPathname);


  }


  return (
    <div>
      <div className='grid grid-cols-2 lg:grid-cols-6 gap-5 '>

        {Foods.map((item, index) => (
          <motion.div
            key={index}
            drag
            dragDirectionLock
            dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
            dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
            dragElastic={0.5}
            onClick={() => setParams(item.name)}
            className="w-[160px] h-[160px] md:w-[200px] md:h-[200px] bg-amber-50 flex flex-col gap-2 justify-center items-center cursor-pointer shadow-2xl rounded-xl"
          >
            <Image
              src={item.image}
              alt={item.name}
              className="size-24 md:size-30 rounded-full"
            />
            <strong>{item.name}</strong>
          </motion.div>

        ))}
      </div>
    </div>
  )
}
