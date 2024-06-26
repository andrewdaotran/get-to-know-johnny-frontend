import ModalWrapperContext, {
  ModalWrapperContextType,
} from "andrewdaotran/context/ModalWrapperContext";
import MobileMenuContext, {
  EDIT_ACTION,
  MobileMenuContextType,
} from "andrewdaotran/context/MobileMenuContext";
import SidebarContext, {
  SidebarContextType,
} from "andrewdaotran/context/SidebarContext";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { Fragment, useContext, useState } from "react";
import { Link as ReactScrollLink, scroller } from "react-scroll";
import { creatorIcons } from "andrewdaotran/utils";
import Link from "next/link";
import ChatboxContext, {
  ChatboxContextType,
} from "andrewdaotran/context/ChatboxContext";

const Footer = () => {
  const router = useRouter();
  const { openSidebar, isSidebarOpen, closeSidebar, sidebarNavItems } =
    useContext(SidebarContext) as SidebarContextType;

  const { menu, changeMenu } = useContext(
    MobileMenuContext
  ) as MobileMenuContextType;

  const { johnnyData, openModal, modalTypeObj, changeModalType } = useContext(
    ModalWrapperContext
  ) as ModalWrapperContextType;

  const { johnnyResponseCount, resetJohnnyResponseCount } = useContext(
    ChatboxContext
  ) as ChatboxContextType;

  const sidebarSmoothScrollToSectionFromEditPage = (linkTo: string) => {
    void (async () => {
      if (menu.isEdit) {
        try {
          await router.push("/");
          scroller.scrollTo(linkTo, {
            duration: 1200,
            smooth: true,
            // containerId: "ContainerElementID",
            offset: -80,
          });
        } catch (error) {
          console.log(error);
        }
      }
      closeSidebar();
    })();
  };

  const navigateToEditPage = () => {
    void (async () => {
      try {
        await router.push("/Edit");
        // await router.push("/edit");
        changeMenu(EDIT_ACTION);
      } catch (error) {
        console.log(error);
      }
      closeSidebar();
    })();
  };

  const [iconHovered, setIconHovered] = useState<string>("");

  const onHover = (title: string) => {
    setIconHovered(title);
  };

  const onUnhover = () => {
    setIconHovered("");
  };
  return (
    // <div className=" fixed  bottom-0 left-[50%] -z-20  grid h-48 translate-x-[-50%]  items-center justify-items-center px-4">
    <div className="fixed bottom-0 left-[50%] -z-[1]  flex h-[22rem] w-full  translate-x-[-50%] justify-center bg-secondary p-16">
      <div className="flex   gap-4  ">
        {/* Submit Contact Button */}
        <div className="grid w-[24rem] min-w-[24rem] grid-cols-3 gap-4 rounded-md  bg-main p-8 shadow-md">
          <div className="relative col-start-1 col-end-2   ">
            <Image
              src={"/images/jar-of-hearts.png"}
              fill
              className="rounded-md object-cover  transition-transform duration-500 ease-in-out "
              alt={"jar-of-hearts"}
              priority
            />
          </div>
          {/* Text on Right */}
          <div className="col-start-2 col-end-4 grid gap-4">
            <h2 className="font-bold tracking-wider">
              Interested in getting to know Johnny better?
            </h2>
            <h3 className="text-sm">
              Send Johnny your contact info and he&apos;ll hit you up!
            </h3>
            <button
              className="rounded-md border border-main bg-gray-800 px-10 py-3  text-sm text-white transition-colors duration-500 hover:border-black hover:bg-main  hover:text-black "
              onClick={() => {
                openModal();
                changeModalType(modalTypeObj.submitContact.type);
              }}
            >
              Submit now!
            </button>
            {/* Text on Right End */}
          </div>
        </div>
        {/* Submit Contact Button End */}

        {/* Navigation */}
        <div className="grid h-fit w-44 min-w-[11rem] gap-2 rounded-md  bg-main p-8 shadow-md">
          <h2 className="mb-4 text-lg text-appOrange">Explore</h2>
          {sidebarNavItems.map((item, index) => {
            return (
              <Fragment key={item.title}>
                {/* Map Over Sidebar Items */}
                {item.title !== "Edit Page" && (
                  <ReactScrollLink
                    key={index}
                    className="flex w-fit cursor-pointer flex-col gap-2 text-sm  transition-all duration-500 hover:pl-2 hover:text-appOrange "
                    to={item.linkTo}
                    smooth={true}
                    duration={1200}
                    offset={-80}
                    onClick={() => {
                      sidebarSmoothScrollToSectionFromEditPage(item.linkTo);
                      if (item.title === "Chat") {
                        resetJohnnyResponseCount();
                      }
                      if (item.title === "Submit Contact") {
                        openModal();
                        changeModalType(modalTypeObj.submitContact.type);
                      }
                    }}
                  >
                    <h3>{item.title}</h3>
                  </ReactScrollLink>
                )}
                {/* Map Over Sidebar Items End */}
                {/* Edit Page Button */}
                {item.title === "Edit Page" &&
                johnnyData?.status === "authenticated" ? (
                  <button
                    className="w-fit  text-sm transition-all duration-500 hover:pl-2 hover:text-appOrange"
                    onClick={navigateToEditPage}
                    style={
                      menu.isEdit
                        ? {
                            color: "rgb(249 115 22)", // appOrange
                            paddingLeft: "0.5rem", // pl-2
                            cursor: "default",
                          }
                        : {}
                    }
                    disabled={menu.isEdit}
                  >
                    {item.title}
                  </button>
                ) : null}
                {/* Edit Page Button End */}
              </Fragment>
            );
          })}
        </div>
        {/* Navigation End */}

        {/* Andrew's Information */}
        <div className="grid h-fit gap-2 rounded-md  bg-main p-8 shadow-md">
          <h2 className="mb-4 text-lg text-appOrange">
            Check out the app&apos;s creator
          </h2>

          {/* Icons Mapped */}
          <div className="flex gap-4">
            {creatorIcons.map((icon, index) => {
              return (
                <h3
                  className="pointer-events-auto cursor-pointer  text-xl  transition-colors duration-300 ease-in-out hover:text-appOrange"
                  key={icon.name}
                  onMouseEnter={() => onHover(icon.title)}
                  onMouseLeave={onUnhover}
                >
                  <Link href={icon.link} className="">
                    <icon.icon />
                  </Link>
                </h3>
              );
            })}
            {/* Hovered Icon Information */}
            {iconHovered && (
              <h4 className="text-sm text-appOrange transition-all duration-300">
                {iconHovered}
              </h4>
            )}
            {/* Hovered Icon Information End */}
          </div>
        </div>
        {/* Icons Mapped End */}

        {/* Andrew's Information End */}
      </div>
    </div>
  );
};

export default Footer;
