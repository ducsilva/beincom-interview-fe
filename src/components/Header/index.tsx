//@ts-nocheck
"use client";

import Image from "next/image";
import { useCallback, useState } from "react";
import React from "react";
import {
    Typography,
    Button,
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Avatar,
    Input,
    Tabs,
    TabsHeader,
    Tab,
} from "@material-tailwind/react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { useAuth, useTabs } from "@/contexts";
import { ArrayTabs, EMenuType, profileMenuItems } from "@/utils";

export const Header = () => {
    const { user, logout } = useAuth();
    const { activeTab, setActiveTab } = useTabs();
    console.log("🚀 ~ Header ~ activeTab:", activeTab);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const closeMenu = () => setIsMenuOpen(false);

    const handleClickMenuItem = useCallback((type: string) => {
        closeMenu();
        switch (type) {
            case EMenuType.logout: {
                logout();
                break;
            }

            default:
                break;
        }
    }, []);

    return (
        <header className="fixed  top-0 z-header h-16 w-screen gap-x-6 border-b bg-white px-6 flex items-center justify-center xl:gap-x-12 xl:px-12 shadow-shadow1">
            <div className="container h-full flex items-center justify-around">
                <div className="hidden min-w-72 max-w-80 grow xl:flex h-full flex-1">
                    <a href="" className="gap-x-1.5 flex justify-center items-center">
                        <Image
                            alt="bic logo icon"
                            loading="lazy"
                            width={28}
                            height={28}
                            decoding="async"
                            data-nimg="1"
                            src="https://group.beincom.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo_beincomm_icon_only.12cfcb79.webp&w=64&q=75"
                            style={{
                                color: "transparent",
                            }}
                        />
                        <Image
                            alt="bic logo text"
                            loading="lazy"
                            width={110}
                            height={22}
                            decoding="async"
                            data-nimg="1"
                            src="https://group.beincom.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo_beincomm_text_only.20ab3824.webp&w=256&q=75"
                            style={{
                                color: "transparent",
                            }}
                        ></Image>
                    </a>
                </div>
                <div className="relative flex items-center w-full gap-2 h-full min-w-[240px] md:min-w-[542px] max-w-[672px]">
                    <Tabs value={activeTab} className="h-full">
                        <TabsHeader
                            className="rounded-none border-b border-blue-gray-50 bg-transparent p-0 h-full mt-3.5"
                            indicatorProps={{
                                className:
                                    "bg-transparent border-b-2 border-gray-900 shadow-none rounded-none",
                            }}
                        >
                            {ArrayTabs.map(({ icon, value }) => (
                                <Tab
                                    key={value}
                                    value={value}
                                    onClick={() => setActiveTab(value)}
                                    className={`flex h-12 w-20 flex-col justify-between rounded-t-lg hover:bg-neutral-2 ${activeTab === value ? "text-gray-900" : ""
                                        }`}
                                >
                                    {React.createElement(icon, {
                                        className: `h-10 w-5 ${activeTab === value ? "text-purple-500" : "text-slate-500"
                                            }`,
                                        strokeWidth: 2,
                                    })}
                                </Tab>
                            ))}
                        </TabsHeader>
                    </Tabs>
                    <div className="relative grow">
                        <Input
                            type="search"
                            color="black"
                            label="Type here..."
                            className="pr-20 h-10 md:min-w-[320px] min-w-[200px"
                        />
                        <Button
                            size="sm"
                            color="white"
                            className="!absolute right-1 top-1 rounded max-w-[80px]"
                        >
                            Search
                        </Button>
                    </div>
                </div>

                <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
                    <MenuHandler>
                        <Button
                            variant="text"
                            color="blue-gray"
                            className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
                        >
                            <Avatar
                                variant="circular"
                                size="sm"
                                alt="tania andrew"
                                className="border border-gray-900 p-0.5"
                                src="https://res.cloudinary.com/dxs1zdei2/image/upload/v1652436107/12-127977_youtuber-avatar-avatar-dev-hd-png-download_sstjb0.png"
                            />
                            <ChevronDownIcon
                                strokeWidth={2.5}
                                className={`h-3 w-3 transition-transform ${isMenuOpen ? "rotate-180" : ""
                                    }`}
                            />
                        </Button>
                    </MenuHandler>
                    <MenuList className="p-2 min-w-72">
                        {profileMenuItems.map(({ label, icon, type }, key) => {
                            const isLastItem = key === profileMenuItems.length - 1;
                            return (
                                <MenuItem
                                    key={label}
                                    onClick={() => handleClickMenuItem(type)}
                                    className={`flex items-center gap-2 rounded ${isLastItem
                                        ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                                        : ""
                                        }`}
                                >
                                    {React.createElement(icon, {
                                        className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                                        strokeWidth: 2,
                                    })}
                                    {type === EMenuType.profile ? (
                                        <div className="flex-col">
                                            <Typography
                                                as="span"
                                                variant="small"
                                                className="font-semibold text-neutral-60 text-base"
                                                color={"inherit"}
                                            >
                                                {user?.fullname}
                                            </Typography>
                                            <Typography
                                                as="span"
                                                variant="small"
                                                className="font-normal text-sm text-neutral-30"
                                                color={"inherit"}
                                            >
                                                {`@${user?.username}`}
                                            </Typography>
                                        </div>
                                    ) : (
                                        <Typography
                                            as="span"
                                            variant="small"
                                            className="font-normal"
                                            color={isLastItem ? "red" : "inherit"}
                                        >
                                            {label}
                                        </Typography>
                                    )}
                                </MenuItem>
                            );
                        })}
                    </MenuList>
                </Menu>
            </div>
        </header>
    );
};
