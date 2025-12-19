import Hero from './components/heroSection';
import Eor from './components/servicesec/Eor';
import GP from './components/servicesec/gp';
import MCP from "./components/servicesec/Mcp"
import GHP from './components/servicesec/ghp'



export default function Page() {
  return (
    <>
      <Hero/>
      <Eor />
      <GP />
      <MCP />
      <GHP />
    </>
  );
}