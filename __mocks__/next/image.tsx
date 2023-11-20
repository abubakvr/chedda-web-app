import React, { ImgHTMLAttributes } from "react";

interface CustomImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  priority?: boolean;
}

const CustomImage: React.FC<CustomImageProps> = ({
  priority,
  ...otherProps
}) => {
  return <img {...otherProps} loading={priority ? "eager" : "lazy"} />;
};

const MockImage: React.FC<React.ImgHTMLAttributes<HTMLImageElement>> = ({
  src,
  alt,
  ...rest
}) => (
  <CustomImage src={src as string} alt={alt as string} {...rest} priority />
);

export default MockImage;
