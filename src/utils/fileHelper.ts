// 파일 확장자 유효성 검사
export const ALLOWED_EXTENSIONS = ['.xlsx', '.pdf', '.docx', '.ppt'];

export const isValidFileType = (fileName: string): boolean =>
  ALLOWED_EXTENSIONS.some((ext) => fileName.endsWith(ext));
