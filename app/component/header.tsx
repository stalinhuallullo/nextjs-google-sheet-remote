"use client";

import type { NextComponentType } from "next";
import Link from "next/link";

const Header: NextComponentType = () => {

  return (
    <>
      <div className="flex items-center justify-center">
          <div>Stalin 🎉</div>
        </div>
        <div className="text-center">
          <u>
            <Link 
              href={`https://docs.google.com/spreadsheets/d/1-mPLG5OphRGseOlhLKbGunKk9QcNriXLBepF9Mlm9TI/edit?usp=sharing`} 
              target={"_blank"}
              passHref>
                Click aqui: Abrir excel remoto
              </Link>
          </u>
        </div>
    </>
  );
};

export default Header;
