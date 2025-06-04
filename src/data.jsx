import { nanoid } from 'nanoid';
import hero1 from './assets/images/Austria_mountain.jpg';
import hero2 from './assets/images/Croatia_country_side.jpg';
import hero3 from './assets/images/France_Effiel_Tower.jpg';
import hero4 from './assets/images/Italy_Colossuem.jpg';
import hero5 from './assets/images/Italy_venice.jpg';
import hero7 from './assets/images/Lake_Bled_Slovenia2.jpg';
import hero8 from './assets/images/Lake_and_mountains.jpg';
import hero9 from './assets/images/Maldives_Beach.jpg';
import hero10 from './assets/images/Monte_Fitz_Roy.jpg';
import hero11 from './assets/images/Dubai_Panoramic.jpg';
import hero12 from './assets/images/Stunning_maldives_aesthetic.jpg';
import hero13 from './assets/images/Torres_del_Paine.jpg';
import hero14 from './assets/images/efbb3b6f-4b05-4416-8664-c50952d39692.jpg';
import hero15 from './assets/images/jessannliu_Amalfi_coast_travel.jpg';
import hero16 from './assets/images/mountain-view.jpg';

export const links = [
  { id: nanoid(), href: '#home', text: 'home' },
  { id: nanoid(), href: '#destination', text: 'destinations' },
  { id: nanoid(), href: '#travelTips', text: 'travel tips' },
  { id: nanoid(), href: '#about', text: 'about' },
];

const heroBg = [
  { href: hero1 },
  { href: hero2 },
  { href: hero3 },
  { href: hero4 },
  { href: hero5 },
  { href: hero7 },
  { href: hero8 },
  { href: hero9 },
  { href: hero10 },
  { href: hero11 },
  { href: hero12 },
  { href: hero13 },
  { href: hero14 },
  { href: hero15 },
  { href: hero16 },
];

export const slides = [heroBg[heroBg.length - 1], ...heroBg, heroBg[0]];
