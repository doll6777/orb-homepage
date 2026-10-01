import type { Metadata } from 'next';
import ClinicHome from '../components/ClinicHome';

export const metadata: Metadata = {
  title: 'ORB Korean Medicine Clinic Magok',
  description:
    'English guide to ORB Korean Medicine Clinic near Magongnaru Station Exit 5. Pain and Chuna care, autonomic and QEEG assessment, stress care, and weight management.',
  alternates: {
    canonical: '/en',
    languages: { ko: '/', en: '/en' },
  },
  openGraph: {
    title: 'ORB Korean Medicine Clinic Magok',
    description: 'Clinic and appointment information near Magongnaru Station Exit 5 in Seoul.',
    url: '/en',
    locale: 'en_US',
  },
};

export default function EnglishHome() {
  return <ClinicHome locale="en" />;
}
