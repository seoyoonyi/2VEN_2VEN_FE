import { useLocation } from 'react-router-dom';

import NavMenuItem from '@/components/common/NavMenuItem';

interface NavigationMenuProps {
  items: {
    to: string;
    label: string;
    notificationCount?: number;
  }[];
}

const NavigationMenu = ({ items }: NavigationMenuProps) => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav>
      <ul>
        {items.map(({ to, label, notificationCount }, idx) => (
          <NavMenuItem
            key={idx}
            to={to}
            label={label}
            isActive={isActive(to)}
            notificationCount={notificationCount}
          />
        ))}
      </ul>
    </nav>
  );
};

export default NavigationMenu;
