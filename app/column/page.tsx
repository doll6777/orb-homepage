import type { Metadata } from 'next';
import ClinicFooter from '../components/ClinicFooter';
import ClinicHeader from '../components/ClinicHeader';
import { columnPosts, externalColumns } from './column-data';

export const metadata: Metadata = {
  title: '의료 칼럼',
  description:
    '오브한의원 마곡점 의료 칼럼. 자율신경, 정량뇌파검사, 통증·추나, 스트레스와 생활 관리에 관한 정보를 안내합니다.',
  alternates: {
    canonical: '/column',
  },
};

export default function ColumnPage() {
  return (
    <main className="interior-page column-page">
      <ClinicHeader />
      <section className="interior-hero compact-hero">
        <div>
          <p className="eyebrow">ORB MEDICAL COLUMN</p>
          <h1>의료 칼럼</h1>
          <p>
            몸의 신호를 조금 더 이해할 수 있도록 검사와 진료 과정,
            생활에서 살펴볼 내용을 차분히 정리합니다.
          </p>
        </div>
      </section>

      <section className="column-index">
        <div className="section-heading-row">
          <div>
            <p className="eyebrow">FEATURED</p>
            <h2>홈페이지에서 읽는 칼럼</h2>
          </div>
          <p>
            기존 네이버 블로그 글을 환자 안내에 필요한 내용 중심으로 다시
            정리했습니다.
          </p>
        </div>
        <div className="column-grid">
          {columnPosts.map((post, index) => (
            <a className="column-card" href={`/column/${post.slug}`} key={post.slug}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <small>{post.category}</small>
              <h3>{post.title}</h3>
              <p>{post.summary}</p>
              <time dateTime={post.publishedAt}>{post.displayDate}</time>
            </a>
          ))}
        </div>
      </section>

      <section className="external-column-section">
        <div>
          <p className="eyebrow">FROM NAVER BLOG</p>
          <h2>블로그에서 더 읽기</h2>
        </div>
        <div className="external-column-list">
          {externalColumns.map((post) => (
            <a href={post.href} target="_blank" rel="noreferrer" key={post.href}>
              <small>{post.category}</small>
              <strong>{post.title}</strong>
              <p>{post.summary}</p>
              <time>{post.displayDate}</time>
              <span aria-hidden="true">↗</span>
            </a>
          ))}
        </div>
      </section>
      <ClinicFooter />
    </main>
  );
}
