'use client';

import { useMemo, useState } from 'react';
import { searchableItems } from '@/lib/world';

export function SearchPanel() {
  const [query, setQuery] = useState('');
  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (normalized.length < 2) {
      return searchableItems.slice(0, 5);
    }

    return searchableItems.filter((item) =>
      `${item.title} ${item.type} ${item.text}`.toLowerCase().includes(normalized)
    );
  }, [query]);

  return (
    <section className="search-shell" aria-labelledby="search-title">
      <div>
        <span className="eyebrow">Быстрый поиск</span>
        <h2 id="search-title">Найдите героя, место или статью</h2>
      </div>
      <label className="search-box">
        <span className="sr-only">Поиск по вики</span>
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Например: дракон, топи, архив..."
        />
      </label>
      <div className="search-results">
        {results.length > 0 ? (
          results.map((item) => (
            <a href={item.href} key={`${item.type}-${item.title}`} className="result-card">
              <span>{item.type}</span>
              <strong>{item.title}</strong>
              <small>{item.text.slice(0, 120)}...</small>
            </a>
          ))
        ) : (
          <p className="empty-state">Ничего не найдено. Попробуйте другое слово из хроник.</p>
        )}
      </div>
    </section>
  );
}
