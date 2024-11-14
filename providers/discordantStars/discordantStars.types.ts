export interface DiscordantStarsState {
  isDiscordantStars: boolean;
}

export enum DiscordantStarsActionKind {
  INCLUDE_DISCORDANT_STARS = "INCLUDE_DISCORDANT_STARS",
}

export interface IsDiscordantStarsAction {
  type: DiscordantStarsActionKind;
  payload: boolean;
}
