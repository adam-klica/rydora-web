import { Metadata } from 'next';
import StreamClient from './StreamClient';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://dev.rydora.me';

interface StreamData {
  _id: string;
  title: string;
  description?: string;
  category: string;
  status: 'SCHEDULED' | 'LIVE' | 'ENDED';
  thumbnailUrl?: string;
  streamer: {
    _id: string;
    username: string;
    user?: {
      profileImage?: string;
    };
  };
  scheduledAt?: string;
  startedAt?: string;
  viewerCount?: number;
}

interface StreamerData {
  _id: string;
  username: string;
  user?: {
    profileImage?: string;
  };
}

async function getStream(streamId: string): Promise<StreamData | null> {
  try {
    const res = await fetch(`${API_BASE}/rydora-tv/streams/${streamId}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    const stream = await res.json();

    // If we have a streamer ID but no user profile image, fetch the full streamer details
    if (stream?.streamer?._id && !stream.streamer?.user?.profileImage) {
      try {
        const streamerRes = await fetch(`${API_BASE}/rydora-tv/streamers/${stream.streamer._id}`, {
          next: { revalidate: 300 },
        });
        if (streamerRes.ok) {
          const streamerData: StreamerData = await streamerRes.json();
          // Merge the full streamer data
          stream.streamer = {
            ...stream.streamer,
            user: streamerData.user,
          };
        }
      } catch {
        // Continue with partial data
      }
    }

    return stream;
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

  // Use streamer's profile image or thumbnail for Open Graph
  const ogImage = stream.thumbnailUrl || stream.streamer?.user?.profileImage;

  return {
    title: `${stream.title} | RydoraTV`,
    description: stream.description || `${statusText} - Watch ${stream.streamer.username} on RydoraTV`,
    openGraph: {
      title: `${statusText}: ${stream.title}`,
      description: stream.description || `Watch ${stream.streamer.username} on RydoraTV`,
      images: ogImage ? [ogImage] : [],
      type: 'video.other',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${statusText}: ${stream.title}`,
      description: stream.description || `Watch ${stream.streamer.username} on RydoraTV`,
      images: ogImage ? [ogImage] : [],
    },
  };
}

export default async function StreamPage({ params }: { params: Promise<{ streamId: string }> }) {
  const { streamId } = await params;
  const stream = await getStream(streamId);

  return <StreamClient streamId={streamId} initialData={stream} />;
}
