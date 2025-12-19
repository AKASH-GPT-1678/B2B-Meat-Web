import React from "react";
import { createContext } from "react";

type TempContextType = {
  user: string | null;
  setUser: React.Dispatch<React.SetStateAction<string | null>>;
};

type Props = {
  children: React.ReactNode;
};
const TempContext = createContext<TempContextType | null>(null);

export default function TempContextProvider({ children }: Props) {
  const [user, setUser] = React.useState<string | null>(null);

  return (
    <TempContext.Provider value={{ user, setUser }}>
      {children}
    </TempContext.Provider>
  );
}
