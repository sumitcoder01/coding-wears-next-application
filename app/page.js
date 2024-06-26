import Image from "next/image";
import Link from "next/link";
import Hero from '../public/image/hero.webp';

export default function Home() {
  return (
    <div className="text-gray-600 body-font">
      <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
        <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
          <Image
            className="object-cover object-center rounded"
            alt="hero"
            src={Hero}
            width={400}
            height={400}
          />
        </div>
        <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
          <h1 className="title-font sm:text-4xl text-2xl mb-4 font-medium text-gray-900">
            Wear the Code
            <br className="inline-block text-md" />Feel the code
          </h1>
          <p className="mb-8 leading-relaxed">
            Code-inspired mugs, stickers, t-shirts, hoodies, and more. Elevate your style with unique coding slogans and designs. Make a statement, wear the code.
          </p>
          <div className="flex justify-center">
            <Link href="/products">
              <span className="inline-flex cursor-pointer text-white bg-pink-500 border-0 py-2 px-6 focus:outline-none hover:bg-pink-600 rounded text-lg">
                Shop Now
              </span>
            </Link>
            <Link href="/about">
              <button className="ml-4 cursor-pointer inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg">
                About Us
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
