import { useEffect, useRef } from 'react';
import { getCategoryLabel } from '../../utils/videoHelpers.js';
import YouTubePlayer from '../ui/YouTubePlayer.jsx';

export default function VideoModal({ video, onClose }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) dialog.showModal();
    document.body.classList.add('no-scroll');
    return () => document.body.classList.remove('no-scroll');
  }, []);

  return (
    <dialog
      ref={dialogRef}
      className="video-modal"
      aria-labelledby="video-modal-title"
      onClose={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="video-modal__bar">
        <p className="video-modal__cat">{getCategoryLabel(video.category)}</p>
        <button type="button" className="video-modal__close" onClick={onClose}>
          Fermer <span aria-hidden="true">✕</span>
        </button>
      </div>

      <div className="video-modal__media">
        <YouTubePlayer
          media={video.media}
          title={video.title}
          thumbs={video.thumbs}
          vertical={video.orientation === 'vertical'}
        />
      </div>

      <div className="video-modal__info">
        <h2 id="video-modal-title" className="video-modal__title">{video.title}</h2>
        {video.description && <p className="video-modal__desc">{video.description}</p>}

        {video.tags.length > 0 && (
          <ul className="video-modal__tags" aria-label="Mots-clés">
            {video.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        )}
      </div>
    </dialog>
  );
}
