import { getCategoryLabel } from '../../utils/videoHelpers.js';
import YtThumb from '../ui/YtThumb.jsx';

function PlayBadge() {
  return (
    <span className="pcard__play" aria-hidden="true">
      <svg viewBox="0 0 24 24" width="18" height="18">
        <path d="M8 5.5v13l11-6.5z" fill="currentColor" />
      </svg>
    </span>
  );
}

export default function VideoCard({ video, lead = false, onOpen }) {
  const label = getCategoryLabel(video.category);

  return (
    <button
      type="button"
      className={`pcard ${lead ? 'pcard--lead' : ''}`}
      aria-haspopup="dialog"
      aria-label={`Lire la vidéo : ${video.title} — ${label}`}
      onClick={(e) => onOpen(video, e.currentTarget)}
    >
      <span className="pcard__thumb">
        <YtThumb sources={video.thumbs} alt={`Miniature de la vidéo ${video.title}`} />
        <PlayBadge />
      </span>

      <span className="pcard__meta">
        <span className="pcard__cat">{label}</span>
        <span className="pcard__title">{video.title}</span>
        {video.description && <span className="pcard__desc">{video.description}</span>}
      </span>
    </button>
  );
}
