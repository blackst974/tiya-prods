import { isFilled } from '../../utils/legalCheck.js';

export default function InfoList({ items }) {
  const rows = items.filter((item) => isFilled(item.value) || item.required);

  return (
    <dl className="info-list">
      {rows.map((item) => (
        <div className="info-list__row" key={item.label}>
          <dt>{item.label}</dt>
          <dd>
            {isFilled(item.value) ? (
              item.href ? <a href={item.href}>{item.value}</a> : item.value
            ) : (
              <span className="legal__missing">Non renseigné</span>
            )}
          </dd>
        </div>
      ))}
    </dl>
  );
}
