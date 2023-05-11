import React from "react";
import Link from "next/link";
import { BsChevronDown ,BsChevronUp} from "react-icons/bs";
const data = [
  { id: 1, name: "Home", url: "/" },
  { id: 2, name: "About", url: "/about" },
  { id: 3, name: "Categories", subMenu: true },
  { id: 4, name: "Contact", url: "/contact" },
];


const Menu = ({ showCatMenu, setShowCatMenu,categories }) => {
  
  return (
    <ul className="hidden md:flex items-center gap-8 font-medium text-black">
      {data?.map((item) => {
        return (
          <React.Fragment key={item?.id}>
            {!!item?.subMenu ? (
              <li className="cursor-pointer flex items-center gap-2 relative" onMouseEnter={()=>setShowCatMenu(true)} onMouseLeave={()=>setShowCatMenu(false)}>
                {item?.name}
                <BsChevronDown size={14} onClick={()=>setShowCatMenu(!showCatMenu)}/>
                {showCatMenu && (
                  <ul className="absolute bg-white top-6 left-0 min-w-[260px] px-1 py-1 text-black shadow-lg">
                    {categories?.map((submenu) => {
                      return (
                        <Link href={`/category/${submenu?.attributes?.slug}`} onClick={()=>setShowCatMenu(false)} key={submenu?.id}> 
                          
                          <li className="h-12 flex justify-between items-center px-3 hover:bg-black/[0.03] rounded-md">
                            {submenu?.attributes?.name}
                            <span className="opacity-50 text-sm" >{`(${submenu?.attributes?.products?.data?.length})`}  </span>
                          </li>
                        </Link>
                      );
                    })}
                  </ul>
                )}
              </li>
            ) : (
              <li className="cursor-pointer">
                <Link href={item?.url}>{item?.name}</Link>
              </li>
            )}
          </React.Fragment>
        );
      })}
    </ul>
  );
};

export default Menu;
