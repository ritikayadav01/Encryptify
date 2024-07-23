import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-slate-900 flex justify-between items-center px-4 h-20 text-purple-200 '>
        <div className="logo font-bold"> 
            &lt;
            <span className='text-purple-200 text-2xl'>
            Encryptify
            </span>
            /&gt;</div>
        <ul> 
            <li className='flex gap-4'>
                <a className=' font-bold hover:font-extrabold' href="/">Home</a>
                <a className=' font-bold hover:font-extrabold' href="#">About</a>
            </li>
        </ul>
    </nav>
  )
}

export default Navbar
