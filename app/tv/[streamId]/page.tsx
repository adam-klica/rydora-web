import { Metadata } from 'next';
import { redirect } from 'next/navigation';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://dev.rydora.me';

interface StreamData {
  _id: string;
  title: string;
  description?: string;
  category: string;
  status: 'SCHEDULED' | 'LIVE' | 'ENDED';
  thumbnailUrl?: string;
  streamer: {
    username: string;
    profileImage?: string;
  };
  scheduledAt?: string;
  startedAt?: string;
  viewerCount?: number;
}

async function getStream(streamId: string): Promise<StreamData | null> {
  try {
    const res = await fetch(`${API_BASE}/rydora-tv/streams/${streamId}`, {
      next: { revalidate: 60 }, // Cache for 60 seconds
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ streamId: string }> }): Promise<Metadata> {
  const { streamId } = await params;
  const stream = await getStream(streamId);

  if (!stream) {
    return {
      title: 'Stream Not Found | RydoraTV',
      description: 'This stream could not be found.',
    };
  }

  const statusText = stream.status === 'LIVE' ? 'LIVE NOW' :
                     stream.status === 'SCHEDULED' ? 'Upcoming' : 'Ended';

  return {
    title: `${stream.title} | RydoraTV`,
    description: stream.description || `${statusText} - Watch ${stream.streamer.username} on RydoraTV`,
    openGraph: {
      title: `${statusText}: ${stream.title}`,
      description: stream.description || `Watch ${stream.streamer.username} on RydoraTV`,
      images: stream.thumbnailUrl ? [stream.thumbnailUrl] : [],
      type: 'video.other',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${statusText}: ${stream.title}`,
      description: stream.description || `Watch ${stream.streamer.username} on RydoraTV`,
      images: stream.thumbnailUrl ? [stream.thumbnailUrl] : [],
    },
  };
}

export default async function StreamPage({ params }: { params: Promise<{ streamId: string }> }) {
  const { streamId } = await params;
  const stream = await getStream(streamId);

  const appDeepLink = `rydora://tv/stream/${streamId}`;
  const webFallback = `https://rydora.me/tv/${streamId}`;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-[#1a1a1a] rounded-2xl overflow-hidden shadow-2xl">
        {/* Thumbnail or placeholder */}
        <div className="relative aspect-video bg-[#2a2a2a]">
          {stream?.thumbnailUrl ? (
            <img
              src={stream.thumbnailUrl}
              alt={stream.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <svg className="w-16 h-16 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/>
              </svg>
            </div>
          )}

          {/* Status badge */}
          {stream && (
            <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold ${
              stream.status === 'LIVE' ? 'bg-red-600' :
              stream.status === 'SCHEDULED' ? 'bg-blue-600' : 'bg-gray-600'
            }`}>
              {stream.status === 'LIVE' ? 'LIVE' :
               stream.status === 'SCHEDULED' ? 'UPCOMING' : 'ENDED'}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5">
          {stream ? (
            <>
              <h1 className="text-xl font-bold mb-2">{stream.title}</h1>

              <div className="flex items-center gap-3 mb-4">
                {stream.streamer.profileImage ? (
                  <img
                    src={stream.streamer.profileImage}
                    alt={stream.streamer.username}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
                    <span className="text-sm font-bold">
                      {stream.streamer.username.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
                <div>
                  <p className="font-semibold">{stream.streamer.username}</p>
                  <p className="text-sm text-gray-400">{stream.category.replace(/_/g, ' ')}</p>
                </div>
              </div>

              {stream.description && (
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">{stream.description}</p>
              )}

              {stream.status === 'SCHEDULED' && stream.scheduledAt && (
                <p className="text-sm text-gray-400 mb-4">
                  Scheduled for: {new Date(stream.scheduledAt).toLocaleString()}
                </p>
              )}
            </>
          ) : (
            <div className="text-center py-4">
              <h1 className="text-xl font-bold mb-2">Stream Not Found</h1>
              <p className="text-gray-400">This stream may have been removed or doesn&apos;t exist.</p>
            </div>
          )}

          {/* Open in App button */}
          <a
            href={appDeepLink}
            className="block w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white text-center py-4 rounded-xl font-bold text-lg hover:opacity-90 transition-opacity"
          >
            Open in Rydora App
          </a>

          {/* App store links */}
          <div className="flex gap-3 mt-4">
            <a
              href="https://apps.apple.com/app/rydora"
              className="flex-1 bg-[#2a2a2a] text-center py-3 rounded-lg text-sm hover:bg-[#3a3a3a] transition-colors"
            >
              App Store
            </a>
            <a
              href="https://play.google.com/store/apps/details?id=com.rydora"
              className="flex-1 bg-[#2a2a2a] text-center py-3 rounded-lg text-sm hover:bg-[#3a3a3a] transition-colors"
            >
              Google Play
            </a>
          </div>
        </div>
      </div>

      {/* Auto-redirect script */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            (function() {
              var appLink = "${appDeepLink}";
              var timeout;

              // Try to open the app
              window.location.href = appLink;

              // If still here after 2.5s, user probably doesn't have the app
              timeout = setTimeout(function() {
                // Stay on this page - they can use the buttons
              }, 2500);

              // If page becomes hidden (app opened), clear timeout
              document.addEventListener('visibilitychange', function() {
                if (document.hidden) {
                  clearTimeout(timeout);
                }
              });
            })();
          `,
        }}
      />
    </div>
  );
}
