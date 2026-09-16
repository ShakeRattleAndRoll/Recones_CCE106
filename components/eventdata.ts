export type eventtype = { id: string; title: string; category: string; date: string; place: string; description: string };

export const eventdata: eventtype[] = [
  { id: 'event-1', title: 'Campus Tech Fair', category: 'Technology', date: 'October 10, 2026', place: 'UM Gymnasium', description: 'Explore student projects, technology booths, and campus innovations.' },
  { id: 'event-2', title: 'Leadership Workshop', category: 'Workshop', date: 'October 12, 2026', place: 'AVR 2', description: 'Build practical leadership and communication skills with fellow students.' },
  { id: 'event-3', title: 'Intramural Opening', category: 'Sports', date: 'October 15, 2026', place: 'University Field', description: 'Join the opening program for this year’s campus intramurals.' },
  { id: 'event-4', title: 'Acoustic Night', category: 'Arts', date: 'October 18, 2026', place: 'Student Plaza', description: 'An evening of acoustic performances by campus artists.' },
  { id: 'event-5', title: 'Career Preparation Talk', category: 'Workshop', date: 'October 20, 2026', place: 'Engineering Hall', description: 'Prepare your resume and learn about internship opportunities.' },
];
