import { useTranslation } from "@/app/i18n";
import {
  SiFacebook,
  SiInstagram,
  SiLinkedin,
  SiYoutube,
  SiTwitter,
} from "react-icons/si";

import Link from "next/link";
import Container from "./layout/Container";

const generateSocialIcon = (platform, className) => {
  if (platform == "facebook") {
    return <SiFacebook className={className} />;
  }
  if (platform == "instagram") {
    return <SiInstagram className={className} />;
  }
  if (platform == "linkedin") {
    return <SiLinkedin className={className} />;
  }
  if (platform == "youtube") {
    return <SiYoutube className={className} />;
  }
  if (platform == "twitter") {
    return <SiTwitter className={className} />;
  }
};

const Footer = async ({ lang, footerData }) => {
  const { t } = await useTranslation(lang, "footer");

  return (
    <footer className=" bg-emerald-300 py-8 ">
      <Container>
        <div className="flex gap-8 md:gap-16 flex-col md:flex-row justify-between items-center">
          <div className="flex gap-8 md:gap-16 flex-col md:flex-row text-center ">
            {footerData.sections.map((section) => (
              <div
                key={section.id}
                className="flex flex-col md:gap-y-4 gap-y-2"
              >
                <h2 className="mb-4 mt-4 text-2xl font-semibold">
                  {section.label}
                </h2>
                {section.links.map((link) => (
                  <Link
                    className=" hover:text-theme-purple-light transition-all duration-300 "
                    key={link.id}
                    href={link.href}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            ))}
          </div>
          <div className="flex gap-8 ">
            {footerData.socialLinks.map((socialLink) => (
              <a
                key={socialLink.id}
                href={socialLink.url}
                target="_blank"
                rel="noreferrer"
                className=" inline-block "
              >
                {generateSocialIcon(
                  socialLink.platform,
                  "h-6 w-6 md:h-8 md:w-8"
                )}
              </a>
            ))}
          </div>
        </div>
        <div className="mt-12">
          <p className="text-center ">
            {" "}
            &copy;{new Date().getFullYear()} AGITARA. All rights reserved
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
