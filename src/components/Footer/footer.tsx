
const icons = [
  {
    title: "LinkedIn",
    href: "https://www.linkedin.com/company/peppy-finance/",
    icon: "/icons/linkedin.svg"
  },
  {
    title: "Twitter ",
    href: "https://twitter.com/Peppy_finance",
    icon: "/icons/twitter.svg"
  },
  {
    title: "Discord",
    href: "/open-positions",
    icon: "/icons/discord.svg"
  },
  {
    title: "GitHub",
    href: "/closed-positions",
    icon: "/icons/github.svg"
  },
  {
    title: "Telegram",
    href: "/pool",
    icon: "/icons/send.svg"
  },
];

export const Footer = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-glass/30 shadow-default drop-blur-md h-[30px] sm:hidden">
      <div className="hidden lg:flex md:flex md:items-center lg:items-center gap-5 text-sm w-full justify-between">
      <div className="">
        <ul className="container flex items-center justify-between w-full gap-5">
        {icons.map((route) => {
            const { title, href, icon } = route;
            return (
              <li key={title}>
                <a href={href} target="_blank" title={title} className="">
                  <img src={icon}/>
                </a>
              </li>
            );
          })}
          </ul>
        </div>
        <div>
          <ul className="container flex items-center justify-between w-full gap-5 py-1 lg:py-2 right-0">
            <li><a href="" className="">Terms and Conditions</a></li>
            <li><a href="" className="">Referral Terms</a></li>
            <li><a href="" className="">Media Links</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
};
