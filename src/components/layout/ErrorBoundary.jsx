import { Component } from 'react';

export default class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    if (import.meta.env.DEV) console.error(error);
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <div className="container route-error">
        <p className="eyebrow">Erreur</p>
        <h1 className="route-error__title">Cette page n'a pas pu s'afficher.</h1>
        <p className="route-error__text">
          Un problème est survenu pendant le chargement. Rechargez la page ou revenez à l'accueil.
        </p>
        <div className="route-error__actions">
          <button type="button" className="btn btn--primary" onClick={() => window.location.reload()}>
            <span>Recharger la page</span>
          </button>
          <a className="btn btn--ghost" href={import.meta.env.BASE_URL}>
            <span>Retour à l'accueil</span>
          </a>
        </div>
      </div>
    );
  }
}
