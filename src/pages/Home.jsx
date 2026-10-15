import Hero from '../components/home/Hero.jsx';
import Manifesto from '../components/home/Manifesto.jsx';
import Expertises from '../components/home/Expertises.jsx';
import FeaturedWorks from '../components/home/FeaturedWorks.jsx';
import Process from '../components/home/Process.jsx';
import ContactCta from '../components/home/ContactCta.jsx';
import useDocumentMeta from '../hooks/useDocumentMeta.js';

export default function Home() {
  useDocumentMeta();
  return (
    <>
      <Hero />
      <Manifesto />
      <Expertises />
      <FeaturedWorks />
      <Process />
      <ContactCta />
    </>
  );
}
