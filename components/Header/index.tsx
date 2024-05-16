import DarkModeSwitcher from './DarkModeSwitcher';
import DropdownMessage from './DropdownMessage';
import DropdownNotification from './DropdownNotification';
import DropdownUser from './DropdownUser';
import {
  type Dispatch,
  type PropsWithChildren,
  type SetStateAction,
} from 'react';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';

interface HeaderProps {
  broken: boolean;
  collapsed: boolean;
  setToggled: Dispatch<SetStateAction<boolean>>;
  setCollapsed: Dispatch<SetStateAction<boolean>>;
}

const Header = ({
  setToggled,
  broken,
  collapsed,
  setCollapsed,
}: PropsWithChildren<HeaderProps>) => {
  return (
    <header className="sticky top-0 z-999 flex w-full bg-popover">
      <div className="flex flex-grow items-center justify-between px-4 py-4 shadow-2 md:px-6 2xl:px-11">
        <div className={`flex items-center gap-2 sm:gap-4`}>
          {/* <!-- Hamburger Toggle BTN --> */}
          <Button
            className={`${broken && 'invisible'}`}
            variant="outline"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              setCollapsed((prevState) => !prevState);
            }}
          >
            {collapsed ? (
              <Icons.rightIcon className="h-4 w-4" />
            ) : (
              <Icons.leftIcon className="h-4 w-4" />
            )}
          </Button>
          {/* <!-- Hamburger Toggle BTN --> */}
          {/*<Link*/}
          {/*  className={`block flex-shrink-0 ${broken || 'invisible'}`}*/}
          {/*  href="/"*/}
          {/*>*/}
          {/*  <Image width={64} height={64} src={'/logo.png'} alt="Logo" />*/}
          {/*</Link>*/}
          <Button
            className={`${broken || 'invisible'}`}
            variant="outline"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              setToggled((prevState) => !prevState);
            }}
          >
            <Icons.maximize className="h-4 w-4" />
          </Button>
        </div>

        {/*<div className="hidden sm:block">*/}
        {/*  <form action="https://formbold.com/s/unique_form_id" method="POST">*/}
        {/*    <div className="relative">*/}
        {/*      <button className="absolute left-0 top-1/2 -translate-y-1/2">*/}
        {/*        <svg*/}
        {/*          className="fill-body hover:fill-primary dark:fill-bodydark dark:hover:fill-primary"*/}
        {/*          width="20"*/}
        {/*          height="20"*/}
        {/*          viewBox="0 0 20 20"*/}
        {/*          fill="none"*/}
        {/*          xmlns="http://www.w3.org/2000/svg"*/}
        {/*        >*/}
        {/*          <path*/}
        {/*            fillRule="evenodd"*/}
        {/*            clipRule="evenodd"*/}
        {/*            d="M9.16666 3.33332C5.945 3.33332 3.33332 5.945 3.33332 9.16666C3.33332 12.3883 5.945 15 9.16666 15C12.3883 15 15 12.3883 15 9.16666C15 5.945 12.3883 3.33332 9.16666 3.33332ZM1.66666 9.16666C1.66666 5.02452 5.02452 1.66666 9.16666 1.66666C13.3088 1.66666 16.6667 5.02452 16.6667 9.16666C16.6667 13.3088 13.3088 16.6667 9.16666 16.6667C5.02452 16.6667 1.66666 13.3088 1.66666 9.16666Z"*/}
        {/*            fill=""*/}
        {/*          />*/}
        {/*          <path*/}
        {/*            fillRule="evenodd"*/}
        {/*            clipRule="evenodd"*/}
        {/*            d="M13.2857 13.2857C13.6112 12.9603 14.1388 12.9603 14.4642 13.2857L18.0892 16.9107C18.4147 17.2362 18.4147 17.7638 18.0892 18.0892C17.7638 18.4147 17.2362 18.4147 16.9107 18.0892L13.2857 14.4642C12.9603 14.1388 12.9603 13.6112 13.2857 13.2857Z"*/}
        {/*            fill=""*/}
        {/*          />*/}
        {/*        </svg>*/}
        {/*      </button>*/}

        {/*      <input*/}
        {/*        type="text"*/}
        {/*        placeholder="Type to search..."*/}
        {/*        className="w-full bg-transparent pl-9 pr-4 font-medium focus:outline-none xl:w-125"*/}
        {/*      />*/}
        {/*    </div>*/}
        {/*  </form>*/}
        {/*</div>*/}

        <div className="flex items-center gap-3 2xsm:gap-7">
          <ul className="flex items-center gap-2 2xsm:gap-4">
            {/* <!-- Dark Mode Toggler --> */}
            <DarkModeSwitcher />
            {/* <!-- Dark Mode Toggler --> */}

            {/* <!-- Notification Menu Area --> */}
            <DropdownNotification />
            {/* <!-- Notification Menu Area --> */}

            {/* <!-- Chat Notification Area --> */}
            <DropdownMessage />
            {/* <!-- Chat Notification Area --> */}
          </ul>

          {/* <!-- User Area --> */}
          <DropdownUser />
          {/* <!-- User Area --> */}
        </div>
      </div>
    </header>
  );
};

export default Header;
