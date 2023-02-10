import Link from "next/link";
import { BsGlobe, BsTwitter, BsYoutube } from "react-icons/bs";
import { SiGmail } from "react-icons/si";
import { GrMail } from "react-icons/gr";

export function Footer() {
  return (
    <footer className="w-full text-white">
      <div className="container mx-auto flex max-w-screen-lg flex-wrap items-center justify-between">
        <div className="grid w-full grid-cols-3">
          <div>© Cody Seibert</div>
          <div className="flex flex-col gap-2">
            <a
              className="flex items-center gap-2"
              target="_blank"
              rel="noreferrer"
              href="https://twitter.com/webdevcody"
            >
              <BsTwitter />
              twitter
            </a>
            <a
              className="flex items-center gap-2"
              target="_blank"
              rel="noreferrer"
              href="https://youtube.com/@webdevcody"
            >
              <BsYoutube />
              youtube
            </a>
            <a
              className="flex items-center gap-2"
              target="_blank"
              rel="noreferrer"
              href="https://www.webdevcody.com"
            >
              <BsGlobe /> website
            </a>
            <a
              className="flex items-center gap-2"
              target="_blank"
              rel="noreferrer"
              href="mailto:webdevcody@gmail.com"
            >
              <GrMail />
              webdevcody@gmail.com
            </a>
          </div>

          <div className="flex flex-col gap-2">
            <Link href="/">Home</Link>
            <Link href="/login">Login</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
