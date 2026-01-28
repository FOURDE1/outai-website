import { Layout } from '@/components/layout';
import {
  Hero,
  CraftJourney,
  Stats,
  Services,
  OutaiWay,
  Blog,
  FAQ,
  Contact,
} from '@/components/sections';

export default function Home() {
  return (
    <Layout>
      <Hero />
      <CraftJourney />
      <Stats />
      <Services />
      <OutaiWay />
      <Blog />
      <Contact />
      <FAQ />
    </Layout>
  );
}
