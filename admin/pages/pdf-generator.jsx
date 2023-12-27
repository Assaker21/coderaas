import PdfGeneratorComponent from "../components/pdf-generator.component.jsx";
//import PdfGeneratorComponent from "../../component.jsx";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "/api/graphql",
  cache: new InMemoryCache(),
});

export default function PdfGenerator() {
  return (
    <ApolloProvider client={client}>
      <PdfGeneratorComponent />
    </ApolloProvider>
  );
}
