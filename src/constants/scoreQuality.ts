export enum ScoreQualityEnum {
  weak = 0,
  normal,
  fine,
  good
}

export const ScoreQualityTitle = new Map([
  [0, 'Yếu'],
  [1, 'Trung bình'],
  [2, 'Khá'],
  [3, 'Giỏi']
])

// export const ScoreQualityTitle = {
//   weak: 'Yếu',
//   normal: 'Trung bình',
//   fine: 'Khá',
//   good: 'Giỏi'
// }
