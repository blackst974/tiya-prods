import VideoCard from './VideoCard.jsx';

export default function VideoGrid({ videos, onOpen }) {
  const hasLead = videos.length >= 3;

  return (
    <ul className="pgrid">
      {videos.map((video, index) => {
        const lead = hasLead && index === 0;
        return (
          <li
            key={video.id}
            className={lead ? 'is-lead' : ''}
            style={{ '--i': Math.min(index, 8) }}
          >
            <VideoCard video={video} lead={lead} onOpen={onOpen} />
          </li>
        );
      })}
    </ul>
  );
}
