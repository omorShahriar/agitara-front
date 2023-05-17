import MainMenu from "@/components/MainMenu";
import Container from "@/components/layout/Container";
import ThemeToggle from "@/components/ThemeToggle";

import MobileMenu from "./MobileMenu";
import LanguageSelector from "./LanguageSelector";
import Logo from "./Logo";
import AccountBox from "./AccountBox";

const Navigation = ({ session, navElementsData }) => {
  return (
    <div className="py-4  shadow-sm ">
      <Container>
        <div className="flex justify-between items-center  ">
          <Logo />
          <div className="flex gap-x-12">
            <ul className="hidden md:flex gap-x-2">
              <MainMenu navElements={navElementsData} />
            </ul>
            <div className="flex gap-x-2 items-center">
              <div className="min-h-[32px] min-w-[32px] hidden md:block">
                <LanguageSelector />
              </div>{" "}
              <div className=" w-12 h-12  items-center justify-center hidden md:flex">
                {" "}
                <ThemeToggle />
              </div>
              <div className="hidden md:block">
                <AccountBox session={session} />
              </div>
              <div className="md:hidden ">
                <MobileMenu navElements={navElementsData} session={session} />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Navigation;
