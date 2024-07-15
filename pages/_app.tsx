import { DiscordantStarsProvider } from "../providers/discordantStars/discordantStars.provider";
import "../styles/globals.css";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <DiscordantStarsProvider>
      <Component {...pageProps} />
    </DiscordantStarsProvider>
  );
}

export default MyApp;
