import { css, SerializedStyles } from '@emotion/react';

interface AvatarProps {
  src: string;
  alt: string;
  customStyle?: SerializedStyles;
}

const Avatar = ({ src, alt }: AvatarProps) => (
  <div css={avatarContainer}>
    <img src={src} alt={alt} css={avatarStyle} />
  </div>
);

const avatarContainer = css`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
`;

const avatarStyle = css`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export default Avatar;
