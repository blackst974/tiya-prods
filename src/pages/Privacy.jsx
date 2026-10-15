import { Link } from 'react-router-dom';
import PageHero from '../components/ui/PageHero.jsx';
import InfoList from '../components/legal/InfoList.jsx';
import LegalChecklist from '../components/legal/LegalChecklist.jsx';
import { site } from '../config/site.js';
import { showreel } from '../data/home.js';
import { allVideos } from '../utils/videoHelpers.js';
import { isFilled } from '../utils/legalCheck.js';
import useDocumentMeta from '../hooks/useDocumentMeta.js';

import '../styles/legal.css';

export default function Privacy() {
  useDocumentMeta('Confidentialité');

  const { legal, privacy } = site;
  const rightsContact = privacy.rightsContact || site.email;
  const usesYouTube = allVideos.length > 0 || Boolean(showreel.url);
  const usesYouTubeThumbs = allVideos.some((v) => v.thumbsFromYouTube) || Boolean(showreel.url);
  const socials = site.socials.filter((s) => s.url);

  return (
    <>
      <PageHero
        eyebrow="Données personnelles"
        title="Confidentialité"
        lead="Cette page décrit les données personnelles traitées lorsque vous utilisez ce site."
      />

      <div className="legal">
        <div className="container legal__body">
          <LegalChecklist />

          <section aria-labelledby="priv-responsable">
            <h2 id="priv-responsable">Responsable du traitement</h2>
            <InfoList
              items={[
                { label: 'Responsable', value: legal.publisherName, required: true },
                {
                  label: 'Contact pour les questions relatives aux données',
                  value: rightsContact,
                  href: rightsContact ? `mailto:${rightsContact}` : undefined,
                  required: true,
                },
              ]}
            />
          </section>

          <section aria-labelledby="priv-formulaire">
            <h2 id="priv-formulaire">Formulaire de contact</h2>
            <p>
              Le formulaire de contact permet de décrire un projet vidéo. Il ne fonctionne pas avec
              un serveur : lorsque vous cliquez sur « Préparer mon message », le site compose un
              e-mail dans votre appareil et ouvre votre messagerie. Ce site n'enregistre pas le
              contenu du formulaire. Le message n'est envoyé que si vous l'envoyez vous-même depuis
              votre messagerie.
            </p>
            <InfoList
              items={[
                {
                  label: 'Finalité',
                  value: 'Répondre à votre demande de contact et étudier votre projet.',
                  required: true,
                },
                { label: 'Base légale', value: privacy.legalBasis, required: true },
                {
                  label: 'Données obligatoires',
                  value: 'Nom, adresse e-mail, type de projet, description du projet.',
                  required: true,
                },
                {
                  label: 'Données facultatives',
                  value: 'Entreprise, budget indicatif, échéance souhaitée, liens de référence.',
                  required: true,
                },
                {
                  label: 'Conséquence d’un refus',
                  value:
                    'Sans les données obligatoires, la demande ne peut pas être préparée ni traitée.',
                  required: true,
                },
                {
                  label: 'Destinataires',
                  value:
                    'L’éditeur du site. Le message transite par les services de messagerie que vous utilisez et par ceux de l’éditeur.',
                  required: true,
                },
                { label: 'Durée de conservation', value: privacy.retention, required: true },
                { label: 'Transferts hors Union européenne', value: privacy.transfers },
              ]}
            />
          </section>

          <section aria-labelledby="priv-droits">
            <h2 id="priv-droits">Vos droits</h2>
            <p>
              Vous pouvez demander l'accès à vos données, leur rectification ou leur effacement,
              vous opposer à leur traitement ou demander sa limitation, dans les conditions prévues
              par la réglementation.
            </p>
            <p>
              Pour exercer ces droits, écrivez à{' '}
              {isFilled(rightsContact) ? (
                <a href={`mailto:${rightsContact}`}>{rightsContact}</a>
              ) : (
                <span className="legal__missing">Non renseigné</span>
              )}
              . Une réponse doit vous être apportée dans un délai d'un mois. Si vous estimez que vos
              droits ne sont pas respectés, vous pouvez adresser une réclamation à la CNIL (
              <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer">cnil.fr</a>
              ).
            </p>
          </section>

          <section aria-labelledby="priv-cookies">
            <h2 id="priv-cookies">Cookies et traceurs</h2>
            <p>
              Ce site ne dépose lui-même aucun cookie publicitaire et n'utilise aucun outil de
              mesure d'audience. Les polices de caractères sont servies depuis le site, sans appel à
              un service de polices externe. Si un outil de ce type était ajouté, cette page serait
              mise à jour et votre consentement serait recueilli lorsque la réglementation l'exige.
            </p>
          </section>

          <section aria-labelledby="priv-tiers">
            <h2 id="priv-tiers">Services tiers</h2>
            <ul className="legal__list">
              <li>
                L'hébergeur du site peut enregistrer des journaux techniques de connexion (par
                exemple l'adresse IP) pour assurer la sécurité et le fonctionnement du service.
                Consultez sa politique de confidentialité.
              </li>
              {usesYouTubeThumbs && (
                <li>
                  Les vidéos présentées sur ce site sont hébergées sur YouTube. Leurs miniatures sont
                  chargées depuis les serveurs de YouTube (domaine i.ytimg.com) lorsque vous
                  consultez les pages qui les affichent : YouTube reçoit alors des informations
                  techniques de votre navigateur, comme votre adresse IP, selon sa propre politique.
                </li>
              )}
              {usesYouTube && (
                <li>
                  Le lecteur vidéo (domaine youtube-nocookie.com) n'est chargé que lorsque vous
                  cliquez sur « Lancer la lecture ». YouTube peut alors recevoir des informations
                  techniques de votre navigateur et utiliser des cookies ou des technologies
                  similaires, selon sa propre politique de confidentialité.
                </li>
              )}
              {socials.length > 0 && (
                <li>
                  Les liens vers les réseaux sociaux mènent vers des sites tiers, régis par leurs
                  propres politiques de confidentialité.
                </li>
              )}
            </ul>
          </section>

          <section aria-labelledby="priv-maj">
            <h2 id="priv-maj">Mises à jour</h2>
            <p>
              Cette page est mise à jour lorsque les fonctionnalités du site changent. Pour les
              informations légales de l'éditeur, consultez les{' '}
              <Link to="/mentions-legales">Mentions légales</Link>.
            </p>
            {isFilled(legal.updatedAt) && <p className="legal__meta">Dernière mise à jour : {legal.updatedAt}</p>}
          </section>
        </div>
      </div>
    </>
  );
}
