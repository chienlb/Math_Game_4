/**
 * Game constants and configuration
 */

export const GAME_CONFIG = {
  THREE: {
    FOV: 75,
    NEAR: 0.1,
    FAR: 1000,
    BACKGROUND_COLOR: 0x0f172a,
    FOG_NEAR: 80,
    FOG_FAR: 200,
  },
  ANIMATION: {
    ROTATION_SPEED: 0.005,
    FLOAT_AMPLITUDE: 0.8,
    PULSE_SPEED: 2,
    MOUSE_INFLUENCE: 0.01,
  },
  COLORS: {
    LIGHT_CYAN: 0x00f3ff,
    LIGHT_PINK: 0xff006e,
    LIGHT_GREEN: 0x00ff88,
    AMBIENT: 0xffffff,
  },
} as const

export const UI_TEXT = {
  COMMON: {
    BACK: "Quay Lại",
    RESTART: "Làm Lại",
    SCORE: "Điểm",
    NEXT_QUESTION: "Câu Tiếp Theo →",
    PLAY_AGAIN: "Chơi Lại",
  },
  NEXT_NUMBER: {
    TITLE: "Tìm số tiếp theo trong dãy:",
    SELECT_ANSWER: "Chọn đáp án:",
    CORRECT: "Chính xác!",
    CORRECT_DESC: "Bạn tìm đúng quy luật rồi!",
    INCORRECT: "Chưa đúng",
    CORRECT_ANSWER: "Đáp án đúng là:",
    COMPLETE: "Bạn hoàn thành trò chơi với",
    POINTS: "điểm!",
  },
  MISSING_NUMBER: {
    TITLE: "Tìm số còn thiếu trong dãy:",
    SELECT_ANSWER: "Chọn đáp án:",
    CORRECT: "Siêu Đúng!",
    CORRECT_DESC: "Bạn tìm thấy số còn thiếu rồi!",
    INCORRECT: "Chưa chính xác",
    CORRECT_ANSWER: "Số đúng là:",
    COMPLETE: "Bạn hoàn thành trò chơi với",
    POINTS: "điểm!",
  },
  SORT_SEQUENCE: {
    TITLE: "Sắp xếp các số theo quy luật tăng dần",
    INSTRUCTIONS: "Nhấp các số để sắp xếp theo thứ tự tăng dần",
    SELECT_NUMBERS: "Các số để chọn:",
    SORTED_SEQUENCE: "Dãy số đã sắp xếp:",
    SELECT_NUMBERS_PLACEHOLDER: "Chọn các số ở trên...",
    CORRECT: "Tuyệt Vời!",
    CORRECT_DESC: "Bạn đã sắp xếp đúng thứ tự!",
    INCORRECT: "Chưa đúng",
    CORRECT_ANSWER: "Thứ tự đúng là:",
    COMPLETE: "Bạn hoàn thành trò chơi với",
    POINTS: "điểm!",
  },
} as const

export const GAME_TYPES = {
  NEXT: "next",
  MISSING: "missing",
  SORT: "sort",
  MENU: "menu",
} as const

export type GameType = (typeof GAME_TYPES)[keyof typeof GAME_TYPES]

