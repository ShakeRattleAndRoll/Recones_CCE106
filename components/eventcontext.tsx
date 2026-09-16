import { createContext, ReactNode, useContext, useState } from 'react';

type eventcontexttype = { joinedEvent: string[]; toggleEvent: (id: string) => void };
const eventcontext = createContext<eventcontexttype | undefined>(undefined);

export function Eventprovider({ children }: { children: ReactNode }) {
  const [joinedEvent, setjoinedEvent] = useState<string[]>([]);
  const toggleEvent = (id: string) => setjoinedEvent((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  return <eventcontext.Provider value={{ joinedEvent, toggleEvent }}>{children}</eventcontext.Provider>;
}

export function useEvent() {
  const value = useContext(eventcontext);
  if (!value) throw new Error('useEvent must be used inside Eventprovider');
  return value;
}
