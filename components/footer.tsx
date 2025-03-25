import type React from "react";

export const Footer: React.FC = () => {
  return (
    <footer className=" mt-[134px] text-white border-t border-gray-800 py-6 px-4 md:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="text-[16px] text-white font-light mb-4 md:mb-0">
          © 2025 Oxscan. All rights reserved.
        </div>

        <div className="flex space-x-6">
          <a
            href="#"
            className="text-[16px] text-white font-light hover:text-white transition-colors"
          >
            Privacy
          </a>
          <a
            href="#"
            className="text-[16px] text-white font-light hover:text-white transition-colors"
          >
            Terms of Use
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
