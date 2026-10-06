'use client';

import { useRef, useState } from 'react';
import type { ColumnPost } from './column-data';

const bookingUrl =
  'https://m.booking.naver.com/booking/16/bizes/1731406?theme=place&lang=ko&area=ple';

export default function CardNewsCarousel({ post }: { post: ColumnPost }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);
  const total = post.cards.length + 2;

  const moveTo = (next: number) => {
    const track = trackRef.current;
    if (!track) return;

    const index = Math.max(0, Math.min(next, total - 1));
    const card = track.children.item(index) as HTMLElement | null;
    card?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
    setCurrent(index);
  };

  const syncCurrentCard = () => {
    const track = trackRef.current;
    if (!track) return;

    const cards = Array.from(track.children) as HTMLElement[];
    const nearest = cards.reduce(
      (best, card, index) => {
        const distance = Math.abs(card.offsetLeft - track.scrollLeft);
        return distance < best.distance ? { index, distance } : best;
      },
      { index: 0, distance: Number.POSITIVE_INFINITY },
    );
    setCurrent(nearest.index);
  };

  return (
    <section className="card-news" aria-labelledby={`card-news-${post.slug}`}>
      <div className="card-news-heading">
        <div>
          <p>핵심만 먼저 보기</p>
          <h2 id={`card-news-${post.slug}`}>넘겨보는 의료정보</h2>
        </div>
        <div className="card-news-controls">
          <span aria-live="polite">
            {String(current + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </span>
          <button
            type="button"
            aria-label="이전 카드"
            disabled={current === 0}
            onClick={() => moveTo(current - 1)}
          >
            ←
          </button>
          <button
            type="button"
            aria-label="다음 카드"
            disabled={current === total - 1}
            onClick={() => moveTo(current + 1)}
          >
            →
          </button>
        </div>
      </div>

      <div
        className="card-news-track"
        ref={trackRef}
        onScroll={syncCurrentCard}
        tabIndex={0}
        aria-label={`${post.title} 카드뉴스. 가로로 스크롤하여 읽을 수 있습니다.`}
      >
        <section className="card-news-card card-news-cover">
          <img
            src={post.coverImage}
            alt={post.coverImageAlt}
            loading="lazy"
            decoding="async"
          />
          <div>
            <small>{post.category}</small>
            <h3>{post.title}</h3>
            <p>오브한의원 의료 칼럼</p>
          </div>
          <span>01</span>
        </section>

        {post.cards.map((card, index) => (
          <section
            className={`card-news-card card-news-text card-news-tone-${(index % 3) + 1}`}
            key={card.title}
          >
            <div className="card-news-card-top">
              <small>{card.label}</small>
              <span>{String(index + 2).padStart(2, '0')}</span>
            </div>
            <div className="card-news-card-copy">
              <h3>{card.title}</h3>
              {card.body ? <p>{card.body}</p> : null}
              {card.bullets ? (
                <ul>
                  {card.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              ) : null}
            </div>
            <p className="card-news-signature">ORB KOREAN MEDICINE CLINIC</p>
          </section>
        ))}

        <section className="card-news-card card-news-ending">
          <div className="card-news-card-top">
            <small>진료 상담 안내</small>
            <span>{String(total).padStart(2, '0')}</span>
          </div>
          <div className="card-news-card-copy">
            <h3>나의 상태에 맞는 설명은 대면 상담에서 확인하세요</h3>
            <p>
              이 카드뉴스는 일반적인 건강정보입니다. 검사와 진료 내용은 개인의
              상태에 따라 달라질 수 있습니다.
            </p>
            <div className="card-news-actions">
              <a href={bookingUrl} target="_blank" rel="noreferrer">
                네이버 예약
              </a>
              <a href="tel:0269595982">전화 상담</a>
            </div>
          </div>
          <p className="card-news-signature">오브한의원 마곡점</p>
        </section>
      </div>

      <p className="card-news-hint" aria-hidden="true">
        좌우로 넘겨서 읽어보세요
      </p>
    </section>
  );
}
