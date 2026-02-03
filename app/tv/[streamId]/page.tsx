import { Metadata } from 'next';
import StreamClient from './StreamClient';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://dev.rydora.me/api';

interface StreamData {
  id: string;
  title: string;
  description?: string;
  category: string;
  status: 'SCHEDULED' | 'LIVE' | 'ENDED';
  thumbnailUrl?: string;
  currentViewers?: number;
  streamer: {
    id: string;
    displayName?: string;
    user?: {
      username: string;
      profileImage?: string;
    };
  };
  scheduledAt?: string;
  startedAt?: string;
}

async function getStream(streamId: string): Promise<StreamData | null> {
  try {
    const res = await fetch(`${API_BASE}/rydora-tv/streams/${streamId}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    const data = await res.json();

    // API returns { stream: {...} }
    const stream = data.stream || data;

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
  const streamerName = stream.streamer?.displayName || stream.streamer?.user?.username || 'Unknown';

  return {
    title: `${stream.title} | RydoraTV`,
    description: stream.description || `${statusText} - Watch ${streamerName} on RydoraTV`,
    openGraph: {
      title: `${statusText}: ${stream.title}`,
      description: stream.description || `Watch ${streamerName} on RydoraTV`,
      images: ogImage ? [ogImage] : [],
      type: 'video.other',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${statusText}: ${stream.title}`,
      description: stream.description || `Watch ${streamerName} on RydoraTV`,
      images: ogImage ? [ogImage] : [],
    },
  };
}

export default async function StreamPage({ params }: { params: Promise<{ streamId: string }> }) {
  const { streamId } = await params;
  const stream = await getStream(streamId);

  return <StreamClient streamId={streamId} initialData={stream} />;
}
