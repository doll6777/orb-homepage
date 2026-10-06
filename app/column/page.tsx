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
          <p className="eyebrow">오브한의원 의료정보</p>
          <h1>의료 칼럼</h1>
          <p>
            검사와 진료 과정, 생활에서 확인할 내용을 이해하기 쉽게
            정리했습니다.
          </p>
        </div>
      </section>

      <section className="column-index">
        <div className="section-heading-row">
          <div>
            <p className="eyebrow">오브 건강 카드</p>
            <h2>한눈에 읽는 의료 칼럼</h2>
          </div>
          <p>
            궁금한 주제의 카드를 눌러 검사와 진료에 관한 내용을 자세히
            확인해 보세요.
          </p>
        </div>
        <div className="column-cover-grid">
          {columnPosts.map((post, index) => (
            <a
              className="column-cover-card"
              href={`/column/${post.slug}`}
              key={post.slug}
            >
              <figure>
                <img
                  src={post.coverImage}
                  alt={post.coverImageAlt}
                  loading="lazy"
                  decoding="async"
                />
                <figcaption>
                  <div className="column-cover-topline">
                    <small>{post.category}</small>
                    <span>{String(index + 1).padStart(2, '0')}</span>
                  </div>
                  <h3>{post.title}</h3>
                  <p>오브한의원 의료 칼럼</p>
                </figcaption>
              </figure>
              <div className="column-cover-summary">
                <p>{post.summary}</p>
                <div>
                  <time dateTime={post.publishedAt}>{post.displayDate}</time>
                  <span>읽어보기 →</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="external-column-section">
        <div>
          <p className="eyebrow">네이버 블로그</p>
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
