import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button.jsx';
import { site } from '../../config/site.js';
import { projectTypes } from '../../data/services.js';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MAX_MAILTO_LENGTH = 1900;

const emptyForm = {
  name: '',
  email: '',
  company: '',
  projectType: '',
  budget: '',
  deadline: '',
  description: '',
  references: '',
};

const FIELD_ORDER = ['name', 'email', 'projectType', 'description'];

function validate(values) {
  const errors = {};
  if (values.name.trim().length < 2) errors.name = 'Indiquez votre nom.';
  if (!values.email.trim()) errors.email = 'Indiquez votre adresse e-mail.';
  else if (!EMAIL_RE.test(values.email.trim()))
    errors.email = 'Cette adresse e-mail ne semble pas valide (exemple : nom@domaine.fr).';
  if (!values.projectType) errors.projectType = 'Choisissez un type de projet.';
  if (values.description.trim().length < 10)
    errors.description = 'Décrivez votre projet en quelques phrases (10 caractères minimum).';
  return errors;
}

function buildMessage(values) {
  const typeLabel = (projectTypes.find((t) => t.value === values.projectType) || {}).label || '';
  const clean = (text) => text.replace(/[\r\n]+/g, ' ').trim();

  const subject = `Demande de projet — ${typeLabel} — ${clean(values.name)}`;

  const lines = [
    'Bonjour,',
    '',
    'Voici ma demande de projet :',
    '',
    `Nom : ${clean(values.name)}`,
    `Adresse e-mail : ${clean(values.email)}`,
  ];
  if (values.company.trim()) lines.push(`Entreprise : ${clean(values.company)}`);
  lines.push(`Type de projet : ${typeLabel}`);
  if (values.budget.trim()) lines.push(`Budget indicatif : ${clean(values.budget)}`);
  if (values.deadline.trim()) lines.push(`Échéance souhaitée : ${clean(values.deadline)}`);
  lines.push('', 'Description du projet :', values.description.trim());
  if (values.references.trim()) lines.push('', 'Liens de référence :', values.references.trim());
  lines.push('', `Message préparé depuis le formulaire du site ${site.name}.`);

  const body = lines.join('\n');
  // Les clients mail attendent des retours à la ligne CRLF dans un lien mailto.
  const href =
    `mailto:${site.email}?subject=${encodeURIComponent(subject)}` +
    `&body=${encodeURIComponent(body.replace(/\n/g, '\r\n'))}`;

  return { subject, body, href };
}

async function copyText(text) {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    /* on tente le repli ci-dessous */
  }
  try {
    const area = document.createElement('textarea');
    area.value = text;
    area.setAttribute('readonly', '');
    area.style.position = 'fixed';
    area.style.opacity = '0';
    document.body.appendChild(area);
    area.select();
    const ok = document.execCommand('copy');
    document.body.removeChild(area);
    return ok;
  } catch {
    return false;
  }
}

export default function ContactForm({ initialProjectType = '' }) {
  const [values, setValues] = useState(() => ({ ...emptyForm, projectType: initialProjectType }));
  const [errors, setErrors] = useState({});
  const [prepared, setPrepared] = useState(null);
  const [copyState, setCopyState] = useState(null);

  const emailReady = Boolean(site.email);

  // Préremplit le type de projet sans jamais écraser un choix déjà fait.
  useEffect(() => {
    if (!initialProjectType) return;
    setValues((current) =>
      current.projectType ? current : { ...current, projectType: initialProjectType }
    );
  }, [initialProjectType]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    if (errors[name]) setErrors((current) => ({ ...current, [name]: undefined }));
    if (prepared) {
      setPrepared(null);
      setCopyState(null);
    }
  };

  const fieldProps = (name, extraDescribedBy) => {
    const describedBy = [errors[name] ? `cf-${name}-error` : null, extraDescribedBy]
      .filter(Boolean)
      .join(' ');
    return {
      id: `cf-${name}`,
      name,
      value: values[name],
      onChange: handleChange,
      'aria-invalid': errors[name] ? 'true' : undefined,
      'aria-describedby': describedBy || undefined,
    };
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!emailReady) return;

    const found = validate(values);
    setErrors(found);
    const firstInvalid = FIELD_ORDER.find((name) => found[name]);
    if (firstInvalid) {
      const el = document.getElementById(`cf-${firstInvalid}`);
      if (el) el.focus();
      return;
    }

    const message = buildMessage(values);
    setPrepared(message);
    setCopyState(null);
    window.location.href = message.href;
  };

  const handleCopy = async () => {
    if (!prepared) return;
    const text = `Destinataire : ${site.email}\nObjet : ${prepared.subject}\n\n${prepared.body}`;
    const ok = await copyText(text);
    setCopyState(ok ? 'ok' : 'error');
  };

  const errorList = FIELD_ORDER.filter((name) => errors[name]);
  const tooLong = prepared && prepared.href.length > MAX_MAILTO_LENGTH;

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      {!emailReady && (
        <div className="contact-form__notice" role="status">
          <p>
            <strong>Formulaire en cours de configuration.</strong> L'adresse e-mail de contact n'est
            pas encore renseignée : l'envoi est désactivé pour le moment.
          </p>
          {import.meta.env.DEV && (
            <p className="contact-form__dev">
              Pour l'activer : renseignez <code>email</code> dans <code>src/config/site.js</code>{' '}
              avant la publication.
            </p>
          )}
        </div>
      )}

      {errorList.length > 0 && (
        <div className="contact-form__summary" role="alert">
          <p>Le formulaire contient {errorList.length > 1 ? 'des erreurs' : 'une erreur'} :</p>
          <ul>
            {errorList.map((name) => (
              <li key={name}>
                <a href={`#cf-${name}`}>{errors[name]}</a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <p className="contact-form__legend">Les champs marqués d'un astérisque (*) sont obligatoires.</p>

      <div className="form-row">
        <div className="field">
          <label htmlFor="cf-name">Nom *</label>
          <input type="text" autoComplete="name" required {...fieldProps('name')} />
          {errors.name && <p id="cf-name-error" className="field__error">{errors.name}</p>}
        </div>
        <div className="field">
          <label htmlFor="cf-email">Adresse e-mail *</label>
          <input
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            {...fieldProps('email')}
          />
          {errors.email && <p id="cf-email-error" className="field__error">{errors.email}</p>}
        </div>
      </div>

      <div className="form-row">
        <div className="field">
          <label htmlFor="cf-company">Entreprise</label>
          <input type="text" autoComplete="organization" {...fieldProps('company')} />
        </div>
        <div className="field">
          <label htmlFor="cf-projectType">Type de projet *</label>
          <select required {...fieldProps('projectType')}>
            <option value="">Choisir un type de projet</option>
            {projectTypes.map((type) => (
              <option key={type.value} value={type.value}>{type.label}</option>
            ))}
          </select>
          {errors.projectType && (
            <p id="cf-projectType-error" className="field__error">{errors.projectType}</p>
          )}
        </div>
      </div>

      <div className="form-row">
        <div className="field">
          <label htmlFor="cf-budget">Budget indicatif</label>
          <input
            type="text"
            placeholder="Montant ou fourchette, si vous en avez une"
            {...fieldProps('budget')}
          />
        </div>
        <div className="field">
          <label htmlFor="cf-deadline">Échéance souhaitée</label>
          <input
            type="text"
            placeholder="Une date ou une période"
            {...fieldProps('deadline')}
          />
        </div>
      </div>

      <div className="field">
        <label htmlFor="cf-description">Description du projet *</label>
        <textarea rows="6" required {...fieldProps('description')} />
        {errors.description && (
          <p id="cf-description-error" className="field__error">{errors.description}</p>
        )}
      </div>

      <div className="field">
        <label htmlFor="cf-references">Liens de référence</label>
        <textarea
          rows="3"
          placeholder="Un lien par ligne : vidéos d'inspiration, moodboard, dossier partagé…"
          {...fieldProps('references', 'cf-references-hint')}
        />
        <p id="cf-references-hint" className="field__hint">
          Facultatif. Les fichiers ne peuvent pas être joints ici : partagez un lien.
        </p>
      </div>

      <p className="contact-form__privacy">
        Les informations saisies servent uniquement à préparer votre message et à répondre à votre
        demande. Elles ne sont pas enregistrées sur ce site : le message passe par votre propre
        messagerie. Pour en savoir plus, consultez la page{' '}
        <Link to="/confidentialite">Confidentialité</Link>.
      </p>

      <Button type="submit" arrow disabled={!emailReady} className="contact-form__submit">
        Préparer mon message
      </Button>
      <p className="field__hint">
        Ce bouton ouvre votre messagerie avec un e-mail prérempli. Rien n'est envoyé tant que vous
        ne l'avez pas envoyé vous-même.
      </p>

      {prepared && (
        <div className="contact-status" role="status">
          <p className="contact-status__title">
            Votre messagerie devrait s'ouvrir avec le message prérempli.
          </p>
          <p>
            Rien n'a été envoyé pour l'instant : le message part uniquement lorsque vous l'envoyez
            depuis votre messagerie, à l'adresse <strong>{site.email}</strong>.
          </p>
          {tooLong && (
            <p>
              Votre message est long : si votre messagerie n'affiche pas tout le texte, utilisez
              « Copier le message ».
            </p>
          )}
          <p>Si rien ne s'ouvre, copiez le message et envoyez-le vous-même.</p>

          <div className="contact-status__actions">
            <Button variant="ghost" size="small" onClick={handleCopy}>Copier le message</Button>
            <a className="btn btn--ghost btn--small" href={prepared.href}>
              <span>Rouvrir ma messagerie</span>
            </a>
          </div>

          {copyState === 'ok' && <p className="contact-status__feedback">Message copié dans le presse-papiers.</p>}
          {copyState === 'error' && (
            <p className="contact-status__feedback" role="alert">
              La copie automatique a échoué. Sélectionnez le texte de l'aperçu ci-dessous pour le copier.
            </p>
          )}

          <details className="contact-status__preview" open={copyState === 'error'}>
            <summary>Aperçu du message</summary>
            <textarea
              readOnly
              rows="10"
              aria-label="Aperçu du message à envoyer"
              value={`Destinataire : ${site.email}\nObjet : ${prepared.subject}\n\n${prepared.body}`}
            />
          </details>
        </div>
      )}
    </form>
  );
}
