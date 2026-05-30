'use client';

import { useMemo, useState } from 'react';
export function WorldMap({ realms }) {
  const [activeId, setActiveId] = useState(realms[0]?.id);
  const activeRealm = useMemo(
    () => realms.find((realm) => realm.id === activeId) ?? realms[0],
    [activeId, realms]
  );

  return (
    <div className="map-layout">
      <div className="map-frame" aria-label="Интерактивная карта мира Астерии">
        <svg viewBox="0 0 900 560" role="img">
          <defs>
            <radialGradient id="seaGlow" cx="50%" cy="45%" r="70%">
              <stop offset="0%" stopColor="#1f3b66" />
              <stop offset="100%" stopColor="#07111f" />
            </radialGradient>
            <filter id="softGlow">
              <feGaussianBlur stdDeviation="6" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <rect width="900" height="560" rx="34" fill="url(#seaGlow)" />
          <path d="M80 280 C170 120 310 80 430 120 C560 165 610 55 770 120 C850 205 790 410 630 470 C420 550 210 505 80 390 Z" fill="#172033" stroke="#394866" strokeWidth="3" />
          <path d="M135 310 C245 230 330 245 405 300 C505 375 660 330 735 405" fill="none" stroke="#2dd4bf" strokeDasharray="10 12" strokeWidth="3" opacity="0.55" />
          {realms.map((realm) => {
            const isActive = realm.id === activeId;
            return (
              <g key={realm.id}>
                <g
                  role="button"
                  tabIndex={0}
                  aria-label={`Открыть область ${realm.name}`}
                  onClick={() => setActiveId(realm.id)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      setActiveId(realm.id);
                    }
                  }}
                  className="map-button"
                >
                  <rect
                    x={realm.x}
                    y={realm.y}
                    width={realm.width}
                    height={realm.height}
                    rx="42"
                    fill={realm.color}
                    opacity={isActive ? '0.45' : '0.24'}
                    stroke={realm.color}
                    strokeWidth={isActive ? '5' : '2'}
                    filter={isActive ? 'url(#softGlow)' : undefined}
                  />
                  <circle cx={realm.x + realm.width / 2} cy={realm.y + realm.height / 2} r={isActive ? '14' : '10'} fill={realm.color} />
                </g>
                <text x={realm.x + 22} y={realm.y + 42} fill="#f8fafc" fontSize="22" fontWeight="700">
                  {realm.name}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
      <aside className="map-panel" id={activeRealm.id}>
        <span className="eyebrow">Уровень угрозы: {activeRealm.danger}</span>
        <h3>{activeRealm.name}</h3>
        <p>{activeRealm.summary}</p>
        <p>{activeRealm.lore}</p>
      </aside>
    </div>
  );
}
