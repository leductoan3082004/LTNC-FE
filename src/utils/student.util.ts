export const checkScoreQuality = (score: number) => {
  if (score < 4.0) return 0
  if (score >= 4.0 && score < 6.0) return 1
  if (score >= 6.0 && score < 8.0) return 2
  return 3
}
