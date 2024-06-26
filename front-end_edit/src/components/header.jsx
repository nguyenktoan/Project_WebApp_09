"use client";

import { callAPI } from "@/utils/api-caller";
import Link from "next/link";
import { useContext, useEffect, useReducer, useState } from "react";
import { useRouter } from "next/navigation";
import { getUser, isLogined, setToken, setUser } from "@/utils/helper";
import { useAppContext } from "./context";

const Header = () => {
  //category
  const [categories, setCategories] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [user, setUserState] = useState(getUser());
  const [searchValue, setSearchValue] = useState("");
  const router = useRouter();
  useEffect(() => {
    fetchData();
    if (isLogined()) fetchShoppingCart();
  }, []);
  const fetchData = async () => {
    try {
      const res = await callAPI("/categories", "GET");
      setCategories(res.data.data);
      console.log(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  //shopping-cart
  const { setShoppingCart, isFetchedShoppingCart, setIsFetchedShoppingCart } =
    useAppContext();
  const fetchShoppingCart = async () => {
    if (!isFetchedShoppingCart) {
      try {
        const res = await callAPI("/my-shopping-cart", "GET");
        console.log(res);
        setShoppingCart(res.data);
        setIsFetchedShoppingCart(true);
      } catch (error) {
        console.log(error);
      }
    }
  };
  const { shoppingCart } = useAppContext();

  //search
  const handleSearchChange = (event) => {
    setSearchValue(event.target.value); // Cập nhật giá trị của input search
  };
  const handleSearchSubmit = (event) => {
    event.preventDefault(); // Ngăn chặn việc reload trang khi submit form
    const encodedSearchValue = encodeURIComponent(searchValue); // Mã hóa giá trị tìm kiếm
    console.log("Kết quả tìm kiếm:", encodedSearchValue); // In kết quả tìm kiếm ra console
    router.push(`/search?keyword=${encodedSearchValue}`);
  };
  const logout = () => {
    setToken("");
    setUser(null);
    setUserState(null);
    router.replace("/");
  };

  return (
    <header className="flex bg-white border-b py-4 sm:px-8 px-6 font-[sans-serif] min-h-[80px] tracking-wide relative z-50">
      <div className="flex flex-wrap items-center w-full gap-4 lg:gap-y-2">
        {/* Logo */}
        <a href="./">
          {/* <img src="/logoH.png" alt="logo" className="w-25 h-11" />{" "} */}
          <img src="/logo-black.png" alt="logo" width={150} height={150} />{" "}
        </a>
        {/* collapseMenu */}
        <div
          id="collapseMenu"
          className="lg:ml-10 max-lg:hidden lg:!block max-lg:before:fixed max-lg:before:bg-black max-lg:before:opacity-50 max-lg:before:inset-0 max-lg:before:z-50"
        >
          <ul className="lg:flex lg:gap-x-3 max-lg:space-y-3 max-lg:fixed max-lg:bg-white max-lg:w-1/2 max-lg:min-w-[300px] max-lg:top-0 max-lg:left-0 max-lg:p-6 max-lg:h-full max-lg:shadow-md max-lg:overflow-auto z-50">
            {/* Home */}
            <li className="px-3 max-lg:border-b max-lg:py-3">
              <a
                href="../"
                className="text-[#333] hover:text-[#369f8b] text-[15px] block font-semibold"
              >
                Home
              </a>
            </li>

            {/* Product */}
            <li className="px-3 max-lg:border-b max-lg:py-3">
              <a
                href="/products
                "
                className="text-[#333] hover:text-[#369f8b] text-[15px] block font-semibold"
              >
                Product
              </a>
            </li>

            {/* Categories */}
            <li style={{ position: "relative" }}>
              <button
                onMouseEnter={() => setMenuOpen(true)}
                onMouseLeave={() => setMenuOpen(false)}
                data-dropdown-toggle="dropdownNavbar"
                className="text-[#333] hover:text-[#369f8b] text-[15px] block font-semibold"
              >
                Categories{" "}
              </button>
              {menuOpen && (
                <div
                  onMouseEnter={() => setMenuOpen(true)}
                  onMouseLeave={() => setMenuOpen(false)}
                  id="dropdownNavbar"
                  className="absolute z-50 min-w-full py-2 overflow-auto bg-white rounded shadow-lg w-max max-h-96"
                >
                  <ul
                    className="py-2 text-base text-gray-950"
                    aria-labelledby="dropdownLargeButton"
                  >
                    {categories.map((val, index) => {
                      return (
                        <li key={index}>
                          <Link
                            href={"/category/" + val.id}
                            className="block px-4 py-2 text-base text-black hover:bg-gray-100 hover:font-bold "
                          >
                            {val.attributes.name}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </li>
          </ul>
        </div>

        {/* search */}
        <form
          onSubmit={handleSearchSubmit}
          className="flex ml-auto gap-x-6 gap-y-4"
        >
          {/* Search */}
          <div className="flex px-6 py-3 overflow-hidden border-2 rounded-full focus-within:border-gray-400 max-w-52 max-lg:hidden">
            <input
              value={searchValue}
              onChange={handleSearchChange}
              type="text"
              placeholder="Search something..."
              className="w-full pr-2 text-sm bg-transparent outline-none"
            />
            {/* SearchButton */}
            <button type="submit" onClick={handleSearchSubmit}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 192.904 192.904"
                width="16px"
                className="cursor-pointer fill-gray-600"
              >
                <path d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z"></path>
              </svg>
            </button>
          </div>
        </form>
        {/* EndSearchBtn */}

        {/* wishlist */}
        <div className="flex items-center space-x-8">
          {/* Sign in button */}
          {!user ? (
            <Link href="/login">
              <button className="px-5 py-2 text-sm rounded-full text-white border-2 border-[#428f81] bg-[#54b09f] hover:bg-[#428f81]">
                Sign In
              </button>
            </Link>
          ) : (
            <div>
              <div>
                {/* WistList */}
                <div className="flex items-center space-x-8">
                  <span className="relative">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20px"
                      className="cursor-pointer fill-[#333] inline"
                      viewBox="0 0 64 64"
                    >
                      <path
                        d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4ZM32 55.64C26.83 52.34 4 36.92 4 22.5a14.5 14.5 0 0 1 26.36-8.33 2 2 0 0 0 3.27 0A14.5 14.5 0 0 1 60 22.5c0 14.41-22.83 29.83-28 33.14Z"
                        data-original="#000000"
                      />
                    </svg>
                    <span className="absolute top-0 left-auto px-1 py-0 -ml-1 text-xs text-white bg-red-500 rounded-full">
                      0
                    </span>
                  </span>
                  {/* Cart */}
                  <Link href="/shopping-cart">
                    <span className="relative">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20px"
                        height="20px"
                        className="cursor-pointer fill-[#333] inline"
                        viewBox="0 0 512 512"
                      >
                        <path
                          d="M164.96 300.004h.024c.02 0 .04-.004.059-.004H437a15.003 15.003 0 0 0 14.422-10.879l60-210a15.003 15.003 0 0 0-2.445-13.152A15.006 15.006 0 0 0 497 60H130.367l-10.722-48.254A15.003 15.003 0 0 0 105 0H15C6.715 0 0 6.715 0 15s6.715 15 15 15h77.969c1.898 8.55 51.312 230.918 54.156 243.71C131.184 280.64 120 296.536 120 315c0 24.812 20.188 45 45 45h272c8.285 0 15-6.715 15-15s-6.715-15-15-15H165c-8.27 0-15-6.73-15-15 0-8.258 6.707-14.977 14.96-14.996zM477.114 90l-51.43 180H177.032l-40-180zM150 405c0 24.813 20.188 45 45 45s45-20.188 45-45-20.188-45-45-45-45 20.188-45 45zm45-15c8.27 0 15 6.73 15 15s-6.73 15-15 15-15-6.73-15-15 6.73-15 15-15zm167 15c0 24.813 20.188 45 45 45s45-20.188 45-45-20.188-45-45-45-45 20.188-45 45zm45-15c8.27 0 15 6.73 15 15s-6.73 15-15 15-15-6.73-15-15 6.73-15 15-15zm0 0"
                          data-original="#000000"
                        ></path>
                      </svg>
                      <span className="absolute top-0 left-auto px-1 py-0 -ml-1 text-xs text-white bg-red-500 rounded-full">
                        {shoppingCart.length}
                      </span>
                    </span>
                  </Link>
                  <button
                    onMouseEnter={() => setProfileOpen(true)}
                    // onMouseLeave={() => setProfileOpen(false)}
                    data-dropdown-toggle="dropdownLeftEnd"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="35px"
                      height="35px"
                      className="cursor-pointer hover:fill-black"
                      viewBox="0 0 512 512"
                      style={{ fill: "#D5D5D5" }} // Thêm style fill để đổi màu
                    >
                      <path
                        d="M437.02 74.981C388.667 26.629 324.38 0 256 0S123.333 26.629 74.98 74.981C26.629 123.333 0 187.62 0 256s26.629 132.667 74.98 181.019C123.333 485.371 187.62 512 256 512s132.667-26.629 181.02-74.981C485.371 388.667 512 324.38 512 256s-26.629-132.667-74.98-181.019zM256 482c-66.869 0-127.037-29.202-168.452-75.511C113.223 338.422 178.948 290 256 290c-49.706 0-90-40.294-90-90s40.294-90 90-90 90 40.294 90 90-40.294 90-90 90c77.052 0 142.777 48.422 168.452 116.489C383.037 452.798 322.869 482 256 482z"
                        data-original="#007bff"
                      />
                    </svg>
                  </button>
                </div>

                {profileOpen && (
                  <div
                    onMouseEnter={() => setProfileOpen(true)}
                    onMouseLeave={() => setProfileOpen(false)}
                    id="dropdownLeftEnd"
                    className="absolute z-50 py-2 overflow-auto bg-white rounded shadow-lg right-2 min-w-1 w-30 max-h-96 "
                  >
                    <ul
                      className="py-2 text-base text-gray-950"
                      aria-labelledby="dropdownLeftEndButton"
                    >
                      {/* Your Profile */}
                      <Link href="/profile">
                        <li className="py-2.5 px-6 flex items-center hover:bg-gray-100 text-[#333] text-sm cursor-pointer">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            className="w-[18px] h-[18px] mr-3"
                            viewBox="0 0 512 512"
                          >
                            <path
                              d="M337.711 241.3a16 16 0 0 0-11.461 3.988c-18.739 16.561-43.688 25.682-70.25 25.682s-51.511-9.121-70.25-25.683a16.007 16.007 0 0 0-11.461-3.988c-78.926 4.274-140.752 63.672-140.752 135.224v107.152C33.537 499.293 46.9 512 63.332 512h385.336c16.429 0 29.8-12.707 29.8-28.325V376.523c-.005-71.552-61.831-130.95-140.757-135.223zM446.463 480H65.537V376.523c0-52.739 45.359-96.888 104.351-102.8C193.75 292.63 224.055 302.97 256 302.97s62.25-10.34 86.112-29.245c58.992 5.91 104.351 50.059 104.351 102.8zM256 234.375a117.188 117.188 0 1 0-117.188-117.187A117.32 117.32 0 0 0 256 234.375zM256 32a85.188 85.188 0 1 1-85.188 85.188A85.284 85.284 0 0 1 256 32z"
                              data-original="#000000"
                            ></path>
                          </svg>
                          View Profile
                        </li>
                      </Link>
                      {/* Your Purchase */}
                      <Link href="/my-purchase">
                        <li className="py-2.5 px-6 flex items-center hover:bg-gray-100 text-[#333] text-sm cursor-pointer">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            className="w-[18px] h-[18px] mr-3"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                            />
                          </svg>
                          My Purchurse
                        </li>
                      </Link>
                      {/* Change your password */}
                      <Link href="/change-password">
                        <li
                          href="#"
                          className="py-2.5 px-6 flex items-center hover:bg-gray-100 text-[#333] text-sm cursor-pointer"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            className="w-[18px] h-[18px] mr-3"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                            />
                          </svg>
                          Change your password
                        </li>
                      </Link>
                      {/* Log out  */}
                      <li
                        onClick={logout}
                        href="#"
                        className="py-2.5 px-6 flex items-center hover:bg-gray-100 text-[#333] text-sm cursor-pointer"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          className="w-[18px] h-[18px] mr-3"
                          viewBox="0 0 6.35 6.35"
                        >
                          <path
                            d="M3.172.53a.265.266 0 0 0-.262.268v2.127a.265.266 0 0 0 .53 0V.798A.265.266 0 0 0 3.172.53zm1.544.532a.265.266 0 0 0-.026 0 .265.266 0 0 0-.147.47c.459.391.749.973.749 1.626 0 1.18-.944 2.131-2.116 2.131A2.12 2.12 0 0 1 1.06 3.16c0-.65.286-1.228.74-1.62a.265.266 0 1 0-.344-.404A2.667 2.667 0 0 0 .53 3.158a2.66 2.66 0 0 0 2.647 2.663 2.657 2.657 0 0 0 2.645-2.663c0-.812-.363-1.542-.936-2.03a.265.266 0 0 0-.17-.066z"
                            data-original="#000000"
                          ></path>
                        </svg>
                        Logout
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
export default Header;
