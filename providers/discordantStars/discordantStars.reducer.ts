import type {
  DiscordantStarsState,
  IsDiscordantStarsAction,
} from "./discordantStars.types";
import { DiscordantStarsActionKind } from "./discordantStars.types";

export function discordantStarsReducer(
  state: DiscordantStarsState,
  action: IsDiscordantStarsAction
): DiscordantStarsState {
  if (action.type === DiscordantStarsActionKind.IS_DISCORDANT_STARS) {
    return { isDiscordantStars: action.payload };
  }
  return state;
}
