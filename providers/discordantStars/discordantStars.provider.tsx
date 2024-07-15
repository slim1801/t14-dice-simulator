import React, { useContext, useReducer } from "react";
import {
  DiscordantStarsState,
  IsDiscordantStarsAction,
} from "./discordantStars.types";
import { discordantStarsReducer } from "./discordantStars.reducer";

export const discordantStarsState: DiscordantStarsState = {
  isDiscordantStars: false,
};

export type Store = [
  DiscordantStarsState,
  React.Dispatch<IsDiscordantStarsAction>?
];

const discordantStarsContext = React.createContext<Store>([
  discordantStarsState,
]);

export const useDiscordantStarsStateContext = () =>
  useContext(discordantStarsContext);

export const DiscordantStarsProvider: React.FunctionComponent<
  React.PropsWithChildren
> = ({ children }) => {
  const [state, dispatch] = useReducer(
    discordantStarsReducer,
    discordantStarsState
  );
  return (
    <discordantStarsContext.Provider value={[state, dispatch]}>
      {children}
    </discordantStarsContext.Provider>
  );
};
