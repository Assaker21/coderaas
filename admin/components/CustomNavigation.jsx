//import type { NavigationProps } from "@keystone-6/core/admin-ui/components";
import {
  NavigationContainer,
  NavItem,
  ListNavItems,
} from "@keystone-6/core/admin-ui/components";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { useQuery, gql } from "@apollo/client";
import { useState } from "react";

const NAV_QUERY = gql`
  {
    navigationMenus {
      id
      address
      value
    }
  }
`;

const client = new ApolloClient({
  uri: "/api/graphql",
  cache: new InMemoryCache(),
});

export function CustomNavigation({ authenticatedItem, lists }) {
  const [navItems, setNavItems] = useState(null);
  const { data, loading, error } = useQuery(NAV_QUERY);
  if (loading) return "Loading...";
  if (error) return <pre>{error}</pre>;
  const navs = data?.navigationMenus;
  if (!navItems) setNavItems(navs);

  return (
    <ApolloProvider client={client}>
      <NavigationContainer authenticatedItem={authenticatedItem}>
        {navItems &&
          navItems.map((item) => {
            console.log(item.value);
            return (
              <NavItem key={item.id} href={item.address}>
                {item.value}
              </NavItem>
            );
          })}
        {/*<NavItem href="/">Dashboard</NavItem>
        <ListNavItems lists={lists} />
        <NavItem href="/pdf-generator">PDF Generator</NavItem>*/}
      </NavigationContainer>
    </ApolloProvider>
  );
}
