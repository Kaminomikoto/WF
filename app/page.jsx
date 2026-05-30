import { MarkdownArticle } from '@/components/MarkdownArticle';
import { SearchPanel } from '@/components/SearchPanel';
import { WorldMap } from '@/components/WorldMap';
import { articles, characters, realms } from '@/lib/world';

export default function Home() {
  return (
    <main>
      <section className="hero">
        <nav className="top-nav" aria-label="Главная навигация">
          <strong>Астерия Wiki</strong>
          <div>
            <a href="#map">Карта</a>
            <a href="#characters">Персонажи</a>
            <a href="#articles">Статьи</a>
          </div>
        </nav>
        <div className="hero-grid">
          <div className="hero-copy">
            <span className="eyebrow">Фэнтези-вселенная</span>
            <h1>Тёмная wiki хроник Астерии</h1>
            <p>
              Исследуйте интерактивную карту, читайте markdown-летописи, находите героев и собирайте
              легенды мира, где обсидиан хранит звёзды, а драконы подписывают договоры приливом.
            </p>
            <div className="hero-actions">
              <a className="primary-action" href="#map">Открыть карту</a>
              <a className="secondary-action" href="#search-title">Начать поиск</a>
            </div>
          </div>
          <div className="hero-orb" aria-hidden="true">
            <div className="cosmic-sigil">А</div>
            <div className="orb-caption">Архив звёздных хроник</div>
          </div>
        </div>
      </section>

      <SearchPanel />

      <section className="section" id="map">
        <div className="section-heading">
          <span className="eyebrow">Живая география</span>
          <h2>Интерактивная карта мира</h2>
          <p>Нажмите на область, чтобы раскрыть её описание, угрозы и локальный фольклор.</p>
        </div>
        <WorldMap realms={realms} />
      </section>

      <section className="section" id="characters">
        <div className="section-heading">
          <span className="eyebrow">Действующие лица</span>
          <h2>Карточки персонажей</h2>
          <p>Каждый герой связан с регионом, конфликтом и собственным набором легендарных привычек.</p>
        </div>
        <div className="character-grid">
          {characters.map((character) => (
            <article className="character-card" id={character.id} key={character.id}>
              <div className={`portrait ${character.gradient}`} aria-hidden="true">
                <span>{character.sigil}</span>
              </div>
              <div className="character-copy">
                <span>{character.realm}</span>
                <h3>{character.name}</h3>
                <p className="title">{character.title}</p>
                <p>“{character.quote}”</p>
                <div className="tags">
                  {character.traits.map((trait) => (
                    <small key={trait}>{trait}</small>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section" id="articles">
        <div className="section-heading">
          <span className="eyebrow">Markdown база знаний</span>
          <h2>Статьи летописцев</h2>
          <p>Контент хранится как markdown и превращается в структурированные статьи на странице.</p>
        </div>
        <div className="article-grid">
          {articles.map((article) => (
            <MarkdownArticle article={article} key={article.slug} />
          ))}
        </div>
      </section>
    </main>
  );
}
