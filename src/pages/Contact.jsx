import { useSearchParams } from 'react-router-dom';
import PageHero from '../components/ui/PageHero.jsx';
import Reveal from '../components/ui/Reveal.jsx';
import ContactForm from '../components/contact/ContactForm.jsx';
import { site } from '../config/site.js';
import { projectTypes } from '../data/services.js';
import useDocumentMeta from '../hooks/useDocumentMeta.js';

import '../styles/pages-info.css';

export default function Contact() {
  useDocumentMeta(
    'Contact',
    'Décrivez votre projet vidéo à TIYA PRODS : publicité, UGC, avatar IA, clip, anime, documentaire ou montage.'
  );

  const [params] = useSearchParams();
  const requested = params.get('projet');
  const initialProjectType = projectTypes.some((t) => t.value === requested) ? requested : '';
  const socials = site.socials.filter((s) => s.url);

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Parlons de votre projet."
        lead="Vous avez une idée, un produit à présenter ou un contenu à produire ? Décrivez-nous votre besoin afin que nous puissions étudier la meilleure approche."
      />

      <section className="section contact" aria-label="Formulaire de contact">
        <div className="container contact__grid">
          <Reveal className="contact__form">
            <ContactForm initialProjectType={initialProjectType} />
          </Reveal>

          <Reveal as="aside" delay={120} className="contact__aside" aria-label="Informations">
            <h2 className="contact__aside-title">Comment ça se passe</h2>
            <ol className="contact__steps">
              <li>
                <strong>Vous décrivez votre besoin</strong>
                <span>Quelques lignes suffisent pour démarrer.</span>
              </li>
              <li>
                <strong>Vous préparez votre message</strong>
                <span>Le formulaire ouvre votre messagerie avec un e-mail prérempli.</span>
              </li>
              <li>
                <strong>Vous l'envoyez vous-même</strong>
                <span>Vous relisez, ajustez si besoin, puis envoyez depuis votre messagerie.</span>
              </li>
            </ol>

            {(site.email || socials.length > 0) && (
              <div className="contact__direct">
                <h2 className="contact__aside-title">Contact direct</h2>
                <ul>
                  {site.email && (
                    <li>
                      <a href={`mailto:${site.email}`}>{site.email}</a>
                    </li>
                  )}
                  {socials.map((s) => (
                    <li key={s.label}>
                      <a href={s.url} target="_blank" rel="noopener noreferrer">{s.label}</a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </Reveal>
        </div>
      </section>
    </>
  );
}
