import type { Metadata } from 'next';
import ColumnArticle from '../ColumnArticle';
import { columnPosts } from '../column-data';

const post = columnPosts[0];

export const metadata: Metadata = {
  title: post.title,
  description: post.summary,
  alternates: { canonical: `/column/${post.slug}` },
  openGraph: {
    title: `${post.title} | 오브한의원 마곡점`,
    description: post.summary,
    url: `/column/${post.slug}`,
    type: 'article',
  },
};

export default function WetQeegGuidePage() {
  return <ColumnArticle post={post} />;
}
