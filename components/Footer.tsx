import React from 'react';
import Link from 'next/link';

const Footer: React.FC<{}> = () => (
  <footer className="bg-gray-900">
    <div className="mx-auto container px-4 py-10">
      <div className="flex flex-wrap pb-12 text-base font-semibold">
        <Link href="/docs">
          <a className="px-3 pb-1 whitespace-no-wrap text-gray-600 hover:text-gray-500">
            Docs
          </a>
        </Link>

        <Link href="/pricing">
          <a className="px-3 pb-1 whitespace-no-wrap text-gray-600 hover:text-gray-500">
            Pricing
          </a>
        </Link>

        <Link href="/privacy-policy">
          <a className="px-3 pb-1 whitespace-no-wrap text-gray-600 hover:text-gray-500">
            Privacy Policy
          </a>
        </Link>

        <Link href="/support">
          <a className="px-3 pb-1 whitespace-no-wrap text-gray-600 hover:text-gray-500">
            Support
          </a>
        </Link>
      </div>

      <div className="px-3 flex items-center">
        <div className="flex-grow text-sm text-gray-600">
          <span className="mr-5">Copyright &copy; 2020 StaticKit</span>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
