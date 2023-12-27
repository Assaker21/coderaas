import type { NavigationProps } from '@keystone-6/core/admin-ui/components';
import { NavigationContainer, NavItem, ListNavItems } from '@keystone-6/core/admin-ui/components';

export function CustomNavigation({ authenticatedItem, lists }: NavigationProps) {
  return (
    <NavigationContainer authenticatedItem={authenticatedItem}>
      <NavItem href="/">Dashboard</NavItem>
      <ListNavItems lists={lists}/>
      <NavItem href="/pdf-generator">
        PDF Generator
      </NavItem>
    </NavigationContainer>
  )
}