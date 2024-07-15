export interface DiscordantStarsState {
  isDiscordantStars: boolean;
}

export enum DiscordantStarsActionKind {
  IS_DISCORDANT_STARS = "IS_DISCORDANT_STARS",
}

export interface IsDiscordantStarsAction {
  type: DiscordantStarsActionKind;
  payload: boolean;
}
