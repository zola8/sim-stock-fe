interface NavItem {
  name: string;
  href: string;
}

interface Props {
  isOpen: boolean;
  navigation: NavItem[];
  onClose: () => void;
}

export default function MobileMenu({ isOpen, navigation, onClose }: Props) {
  if (!isOpen) return null;

  return (
    <div className="lg:hidden border-t border-[var(--sidebar-border)] bg-primary-foreground">
      <div className="space-y-1 px-6 pb-3 pt-2">
        {navigation.map((item, index) => {
          if (item.name === "---") {
            return (
              <div
                key={`separator-${index}`}
                className="my-2 border-t border-[var(--sidebar-border)]"
              />
            );
          }

          return (
            <a
              key={`${item.name}-${index}`}
              href={item.href}
              className="block rounded-md px-3 py-2 text-base font-medium text-[var(--muted-foreground)] hover:bg-[var(--secondary)] hover:text-[var(--secondary-foreground)]"
              onClick={onClose}
            >
              {item.name}
            </a>
          );
        })}
      </div>
    </div>
  );
}
