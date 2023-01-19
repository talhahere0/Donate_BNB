import Link from 'next/link'
import React from 'react'

const Header = () => {
  return (
    <>
      <header className="border-b p-3">
        <div className="max-w-screen-2xl mx-auto flex items-center">
          <Link href="/">
            <h1 className="text-base sm:text-xl font-bold text-brand-3">
              Donate BNB
            </h1>
          </Link>
          <div className="grow">
            {/* <button className="ml-auto block text-sm sm:text-base bg-brand-3 bg-opacity-30 hover:bg-opacity-60 transition rounded-full px-4 md:px-6 py-2 md:py-3 cursor-pointer">
              Connect Wallet
            </button> */}
          </div>
        </div>
      </header>
    </>
  )
}

export default Header
