import { Link } from 'react-router-dom';
import PageHero from '../components/ui/PageHero.jsx';
import InfoList from '../components/legal/InfoList.jsx';
import LegalChecklist from '../components/legal/LegalChecklist.jsx';
import { site } from '../config/site.js';
import { isFilled, getPublisherLabel } from '../utils/legalCheck.js';
import useDocumentMeta from '../hooks/useDocumentMeta.js';

import '../styles/legal.css';

export default function Legal() {
  useDocumentMeta('Mentions légales');
  const legal = site.legal;

  return (
    <>
      <PageHero
        eyebrow="Informations légales"
        title="Mentions légales"
        lead="Informations relatives à l'éditeur et à l'hébergement de ce site."
      />

      <div className="legal">
        <div className="container legal__body">
          <LegalChecklist />

          <section aria-labelledby="legal-editeur">
            <h2 id="legal-editeur">Éditeur du site</h2>
            <p>
              {site.name} est le nom commercial d'une entreprise individuelle exploitée sous le
              régime de la micro-entreprise. Il ne s'agit pas d'une société : l'éditeur du site est
              la personne physique indiquée ci-dessous.
            </p>
            <InfoList
              items={[
                { label: 'Nom commercial', value: site.name, required: true },
                { label: 'Éditeur', value: getPublisherLabel(), required: true },
                { label: 'Statut', value: legal.legalStatus, required: true },
                { label: 'SIRET', value: legal.siret },
                { label: 'Adresse de domiciliation', value: legal.address, required: true },
                { label: 'Autres informations', value: legal.otherInfo },
              ]}
            />
          </section>

          <section aria-labelledby="legal-publication">
            <h2 id="legal-publication">Responsable de publication</h2>
            <InfoList
              items={[{ label: 'Responsable de publication', value: legal.publicationDirector, required: true }]}
            />
          </section>

          <section aria-labelledby="legal-contact">
            <h2 id="legal-contact">Contact</h2>
            <InfoList
              items={[
                {
                  label: 'Adresse e-mail',
                  value: site.email,
                  href: site.email ? `mailto:${site.email}` : undefined,
                  required: true,
                },
                { label: 'Téléphone', value: legal.phone, required: true },
              ]}
            />
          </section>

          <section aria-labelledby="legal-hebergeur">
            <h2 id="legal-hebergeur">Hébergeur</h2>
            <InfoList
              items={[
                { label: 'Hébergeur', value: legal.hostName, required: true },
                { label: 'Adresse', value: legal.hostAddress, required: true },
                { label: 'Téléphone', value: legal.hostPhone },
                { label: 'Site web', value: legal.hostContact, href: legal.hostContact || undefined },
              ]}
            />
          </section>

          <section aria-labelledby="legal-propriete">
            <h2 id="legal-propriete">Propriété intellectuelle</h2>
            <p>
              Les contenus de ce site (textes, logo, images, vidéos et éléments graphiques) sont
              protégés. Sauf mention contraire, toute reproduction ou réutilisation sans
              autorisation préalable de l'éditeur est interdite.
            </p>
          </section>

          <section aria-labelledby="legal-ia">
            <h2 id="legal-ia">Contenus créés avec l'intelligence artificielle</h2>
            <p>
              Certaines vidéos et images présentées sur ce site sont créées ou assistées par des
              outils d'intelligence artificielle. Un personnage ou un avatar généré n'est jamais
              présenté comme un véritable client.
            </p>
          </section>

          <section aria-labelledby="legal-liens">
            <h2 id="legal-liens">Liens externes</h2>
            <p>
              Ce site peut proposer des liens vers des sites ou des plateformes tiers (réseaux
              sociaux, plateformes vidéo). L'éditeur n'est pas responsable de leur contenu.
            </p>
          </section>

          <section aria-labelledby="legal-donnees">
            <h2 id="legal-donnees">Données personnelles</h2>
            <p>
              Les informations relatives aux données personnelles sont détaillées dans la page{' '}
              <Link to="/confidentialite">Confidentialité</Link>.
            </p>
          </section>

          {isFilled(legal.updatedAt) && <p className="legal__meta">Dernière mise à jour : {legal.updatedAt}</p>}
        </div>
      </div>
    </>
  );
}
