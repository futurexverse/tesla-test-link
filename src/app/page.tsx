import { redirect } from 'next/navigation';

export default function Home() {
  // The static site lives in /public/index.html — serve it directly.
  redirect('/index.html');
}
