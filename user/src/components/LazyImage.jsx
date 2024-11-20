import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const LazyImage = React.memo(({ src, alt, effect, style, className, onLoad, delayTime }) => {
  return (
    <LazyLoadImage className={className} src={src} alt={alt} effect={effect} style={style} onLoad={onLoad} delayTime={delayTime} />
  )
});

export default LazyImage;