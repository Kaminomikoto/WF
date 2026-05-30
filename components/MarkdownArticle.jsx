function inlineFormat(text) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    }

    return part;
  });
}

export function MarkdownArticle({ article }) {
  const lines = article.markdown.split('\n');
  const elements = [];
  let listItems = [];

  const flushList = () => {
    if (listItems.length === 0) {
      return;
    }

    elements.push(
      <ul key={`list-${elements.length}`}>
        {listItems.map((item) => (
          <li key={item}>{inlineFormat(item)}</li>
        ))}
      </ul>
    );
    listItems = [];
  };

  lines.forEach((line, index) => {
    if (line.startsWith('- ')) {
      listItems.push(line.slice(2));
      return;
    }

    flushList();

    if (line.startsWith('# ')) {
      elements.push(<h3 key={index}>{line.slice(2)}</h3>);
    } else if (line.startsWith('## ')) {
      elements.push(<h4 key={index}>{line.slice(3)}</h4>);
    } else if (line.startsWith('> ')) {
      elements.push(<blockquote key={index}>{inlineFormat(line.slice(2))}</blockquote>);
    } else if (/^\d+\. /.test(line)) {
      elements.push(<p key={index}>{inlineFormat(line.replace(/^\d+\. /, '• '))}</p>);
    } else if (line.trim().length > 0) {
      elements.push(<p key={index}>{inlineFormat(line)}</p>);
    }
  });

  flushList();

  return (
    <article className="article-card" id={article.slug}>
      <div className="article-meta">{article.category}</div>
      {elements}
    </article>
  );
}
