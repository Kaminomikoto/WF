import './globals.css';

export const metadata = {
  title: 'Астерия — фэнтези-вики',
  description: 'Тёмная интерактивная wiki по фэнтези-вселенной Астерии'
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
