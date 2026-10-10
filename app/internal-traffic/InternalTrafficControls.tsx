'use client';

import { useEffect, useState } from 'react';

type AnalyticsStatus = {
  enabled: boolean;
  eligible: boolean;
  internal: boolean;
  reason: string;
};

type AnalyticsControls = {
  status(): AnalyticsStatus;
  isInternal(): boolean;
  setInternal(value: boolean): boolean;
};

function controls(): AnalyticsControls | undefined {
  return (window as Window & { orbAnalytics?: AnalyticsControls }).orbAnalytics;
}

export default function InternalTrafficControls() {
  const [status, setStatus] = useState<AnalyticsStatus | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const update = () => setStatus(controls()?.status() ?? null);
    update();
    window.addEventListener('orb-analytics-ready', update);
    window.addEventListener('orb-analytics-status', update);
    window.addEventListener('storage', update);
    return () => {
      window.removeEventListener('orb-analytics-ready', update);
      window.removeEventListener('orb-analytics-status', update);
      window.removeEventListener('storage', update);
    };
  }, []);

  function change(internal: boolean) {
    const api = controls();
    if (!api || !api.setInternal(internal)) {
      setError('설정을 저장하지 못했습니다. 브라우저의 사이트 저장소 사용을 허용한 뒤 다시 시도해 주세요.');
      return;
    }
    setError('');
    setStatus(api.status());
  }

  const buttonStyle = {
    padding: '12px 18px',
    border: '1px solid currentColor',
    borderRadius: '3px',
    font: 'inherit',
    background: 'transparent',
    color: 'inherit',
    cursor: 'pointer',
  } as const;

  return (
    <section aria-labelledby="internal-traffic-heading">
      <h2 id="internal-traffic-heading">이 브라우저의 설정</h2>
      <p role="status" aria-live="polite">
        {status
          ? status.internal
            ? '제외 켜짐 — 이 브라우저의 방문과 버튼 클릭을 전송하지 않습니다.'
            : '제외 꺼짐 — 일반 방문 페이지에서는 방문과 버튼 클릭이 기록될 수 있습니다.'
          : '설정 도구를 불러오는 중입니다. 계속 표시되면 페이지를 새로고침해 주세요.'}
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, margin: '18px 0' }}>
        <button type="button" style={buttonStyle} disabled={!status || status.internal} onClick={() => change(true)}>
          이 브라우저의 접속 제외하기
        </button>
        <button type="button" style={buttonStyle} disabled={!status || !status.internal} onClick={() => change(false)}>
          제외 해제하기
        </button>
      </div>
      {error && <p role="alert">{error}</p>}
      <p><a href="/">홈페이지로 돌아가기</a></p>
      <noscript>이 설정에는 JavaScript가 필요합니다. JavaScript를 사용하지 않으면 홈페이지 방문 통계도 전송되지 않습니다.</noscript>
    </section>
  );
}
