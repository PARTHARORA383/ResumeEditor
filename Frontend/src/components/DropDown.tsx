
import {motion , AnimatePresence } from 'motion/react'
import { useState } from 'react'


interface props {
options : string[],
placeholder : string ,
selected : string ,
setSelected : React.Dispatch<React.SetStateAction<string>>;
}

export const DropDown = ({options  , placeholder ,selected ,setSelected } : props)=>{
const [isOpen , setIsOpen] = useState<true|false>(false);

  return <div>
    <div className='relative'>

    <div className='text-md text-neutral-900  border-2 border-neutral-400   rounded-lg p-[6.5px] cursor-pointer hover:bg-neutral-100 hover:opacity-80 transition-colors duration-200 active:bg-neutral-200 active:opacity-80' 
    onClick={()=>{
      setIsOpen(!isOpen)
    }}>{selected || <p className='text-neutral-500'>
      {placeholder}
    </p> || "Select an option"}</div>

   
    <AnimatePresence>
    
      {
        isOpen && <motion.div
        initial = {{opacity : 0.5 , y : -10}}
        animate = {{opacity : 1 , y : 0 }}
        exit={{opacity : 0 , y : -10}}
        transition={{duration : 0.18 , ease : "easeInOut"}}
        className=' absolute w-full mt-2 bg-white shadow-lg p-3 rounded-lg z-20 '>
          {options.map((option , index)=>(
            <motion.div 
            className=' rounded-lg ' key={index}>

              <motion.div className='text-neutral-950  p-1.5 hover:bg-neutral-100 rounded-lg transition-colors duration-200 cursor-pointer' onClick={()=>{
                setSelected(option)
                setIsOpen(false)
              }}>
                {option}
                </motion.div>
                

              </motion.div>
          ))}

        </motion.div>
      }


    </AnimatePresence>
      </div>

  </div>
}