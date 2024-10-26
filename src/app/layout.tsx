import {PropsWithChildren} from 'react';

export const metadata = {
  title: 'Next.js',
  description: 'Generated by Next.js'
};

function RootLayout({children}: PropsWithChildren) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

export default RootLayout;
