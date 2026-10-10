import ClinicFooter from '../components/ClinicFooter';
import ClinicHeader from '../components/ClinicHeader';
import SiteMotion from '../components/SiteMotion';
import type { ColumnPost } from './column-data';

const bookingUrl =
  'https://m.booking.naver.com/booking/16/bizes/1731406?theme=place&lang=ko&area=ple';

const relatedReading: Record<string, { href: string; label: string }> = {
  'wet-qeeg-guide': {
    href: '/column/qeeg-process',
    label: '정량뇌파검사 전 준비와 실제 진행 과정',
  },
  'qeeg-process': {
    href: '/column/wet-qeeg-guide',
    label: '정량뇌파검사의 목적과 결과를 해석할 때 살펴볼 점',
  },
  'autonomic-top-down-bottom-up': {
    href: '/column/wet-qeeg-guide',
    label: '정량뇌파검사로 확인하는 내용과 결과 해석',
  },
};

export default function ColumnArticle({ post }: { post: ColumnPost }) {
  const relatedPost = relatedReading[post.slug];
  const articleUrl = `https://orbclinic.pages.dev/column/${post.slug}`;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.summary,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    mainEntityOfPage: articleUrl,
    author: {
      '@type': 'Organization',
      name: '오브한의원 마곡점',
      url: 'https://orbclinic.pages.dev',
    },
    publisher: {
      '@type': 'MedicalClinic',
      name: '오브한의원 마곡점',
      url: 'https://orbclinic.pages.dev',
      logo: {
        '@type': 'ImageObject',
        url: 'https://orbclinic.pages.dev/favicon-512.png',
      },
    },
  };

  return (
    <main className="article-page">
      <SiteMotion />
      <ClinicHeader />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article>
        <header className="article-header">
          <nav className="breadcrumbs" aria-label="현재 위치">
            <a href="/">홈</a>
            <span aria-hidden="true">/</span>
            <a href="/column">의료 칼럼</a>
          </nav>
          <p className="eyebrow">오브한의원 의료 칼럼</p>
          <span className="article-category">{post.category}</span>
          <h1>{post.title}</h1>
          <p className="article-summary">{post.summary}</p>
          <div className="article-meta">
            <span>오브한의원</span>
            <time dateTime={post.publishedAt}>{post.displayDate}</time>
            <span>읽는 시간 {post.readTime}</span>
          </div>
        </header>

        <div className="article-body">
          {post.sections.map((section) => (
            <section key={section.heading}>
              <h2>{section.heading}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              {section.bullets ? (
                <ul>
                  {section.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}

          <aside className="medical-note">
            <strong>의료정보 이용 안내</strong>
            <p>
              이 글은 일반적인 건강정보 제공을 위한 내용입니다. 개인의 증상과
              건강 상태에 따라 검사 및 진료 내용은 달라질 수 있으며, 정확한
              판단은 의료진과의 대면 진료를 통해 확인해야 합니다.
            </p>
          </aside>

          <div className="article-source">
            <span>기존 오브한의원 네이버 블로그 글을 홈페이지용으로 정리했습니다.</span>
            <a href={post.originalUrl} target="_blank" rel="noreferrer">
              블로그 원문 보기 ↗
            </a>
          </div>

          <section aria-labelledby="related-reading-heading">
            <h2 id="related-reading-heading">이어서 살펴보세요</h2>
            <ul className="contextual-links">
              {relatedPost ? (
                <li><a href={relatedPost.href}>{relatedPost.label}</a></li>
              ) : null}
              <li>
                <a href="/treatments/autonomic-qeeg">자율신경·뇌파검사 상담 대상과 진료 과정</a>
              </li>
              <li>
                <a href="/first-visit">첫 방문 예약, 준비물과 주차 안내</a>
              </li>
            </ul>
          </section>
        </div>

        <aside className="article-cta">
          <div>
            <p className="eyebrow">진료 상담</p>
            <h2>현재의 불편을 상담해 보세요</h2>
            <p>마곡나루역 5번 출구에서 136m, 오브한의원 마곡점입니다.</p>
          </div>
          <div>
            <a href={bookingUrl} target="_blank" rel="noreferrer">
              네이버 예약
            </a>
            <a href="tel:0269595982">02-6959-5982</a>
          </div>
        </aside>
      </article>
      <ClinicFooter />
    </main>
  );
}
