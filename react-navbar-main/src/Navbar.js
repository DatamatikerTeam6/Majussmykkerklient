import { Link } from "react-router-dom";
import { Heading } from "./components/heading/Heading";
import { Img } from "./components/img/Img";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Header({ ...props }) {
    const [orderMenuOpen, setOrderMenuOpen] = useState(false); // State to toggle submenu
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        navigate('/');
        window.location.reload();
    };

    return (
        <header
            {...props}
            className={`${props.className} flex sm:flex-col self-stretch justify-between items-center gap-5`}
        >
            <ul className="flex flex-wrap items-center gap-7">
                <li>
                    <a href="#" className="lg:text-[30px] md:text-[30px] sm:text-[28px]">
                        <Heading size="texts" as="p" className="text-[36px] font-medium tracking-[-0.79px] text-gray-700">
                            Menu
                        </Heading>
                    </a>
                </li>
                <li>
                    <a href="./Customer" className="lg:text-[17px]">
                        <Heading as="p" className="text-[20px] font-medium tracking-[-0.44px] text-gray-700">
                            Kunder
                        </Heading>
                    </a>
                </li>
                <li>
                    {/* Toggle "Ordre" submenu */}
                    <button onClick={() => setOrderMenuOpen(!orderMenuOpen)} className="lg:text-[17px]">
                        <Heading as="p" className="text-[20px] font-medium tracking-[-0.44px] text-gray-700">
                            Ordre
                        </Heading>
                    </button>
                    {orderMenuOpen && (
                        <ul className="mt-2 space-y-1">
                            <li>
                                <Link to="/order" className="text-[18px] text-gray-700">
                                    Opret Ordre
                                </Link>
                            </li>
                            <li>
                                <Link to="/ViewOrders" className="text-[18px] text-gray-700">
                                    Se Ordre
                                </Link>
                            </li>
                        </ul>
                    )}
                </li>
                <li>
                    <a href="./Review" className="lg:text-[17px]">
                        <Heading as="p" className="text-[20px] font-medium tracking-[-0.44px] text-gray-700">
                            Stjerner
                        </Heading>
                    </a>
                </li>
                <li>
                    <a href="./Calendar" className="lg:text-[17px]">
                        <Heading as="p" className="text-[20px] font-medium tracking-[-0.44px] text-gray-700">
                            Kalender
                        </Heading>
                    </a>
                </li>
            </ul>
            <button shape="round" className="ml-[134px] min-w-[126px] rounded px-[30px] tracking-[-0.44px] sm:ml-0 sm:px-4" onClick={handleLogout}>
                Log ud
            </button>
        </header>
    );
}
