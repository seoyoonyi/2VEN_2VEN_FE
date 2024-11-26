import { css, SerializedStyles } from '@emotion/react';

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src: string;
  alt: string;
  size?: string | number;
  customStyle?: SerializedStyles;
}

const Avatar = ({ src, alt, size = 40, customStyle, ...props }: AvatarProps) => (
  <div css={[avatarContainer(size), customStyle]} {...props}>
    <img src={src} alt={alt} css={avatarStyle} />
  </div>
);

const avatarContainer = (size: string | number) => css`
  width: ${typeof size === 'number' ? `${size}px` : size};
  aspect-ratio: 1;
  border-radius: 50%;
  overflow: hidden;
`;

const avatarStyle = css`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export default Avatar;
