export interface NavItem {
  name: string;
  href: string;
}


export const navigation: NavItem[] = [
  { name: "Charts", href: "/charts" },
  { name: "---", href: "#" },
  { name: "Ticker info", href: "/ticker-info" },
  { name: "Financials", href: "/financials" },
];
