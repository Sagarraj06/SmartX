import React from 'react'
import { useGSAP } from '@gsap/react'
import grap from 'gsap'

const logoAnimation = () => {


  useGSAP(()=>{
    const t1= grap.timeline();
    t1.from(".smart",{
      x:"200",
      opacity:0,
      delay:0.3,
      duration:0.6,
    });
    t1.from(".xLogo",{
      y:200,
      opacity:0,
      duration:0.6,
    })

  })
  return (
    <div>
      <h1 className='text-6xl font-bold flex items-center'> 
        <p className='smart'>Smart</p> 
        <p className='text-yellow-400 text-9xl inline-block xLogo'>X</p>
      </h1>
    </div>
  )
}

export default logoAnimation
