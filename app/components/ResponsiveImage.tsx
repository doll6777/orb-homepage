import manifest from './image-manifest.json';

type ImageInfo = { width: number; height: number; variants: { src: string; width: number }[] };

/** Keeps the existing img/CSS crop while serving a correctly sized, optimized photo. */
export default function ResponsiveImage({
  src,
  alt,
  sizes,
  priority = false,
}: {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
}) {
  const image = (manifest as Record<string, ImageInfo>)[src];
  const fallback = image?.variants.find(variant => variant.width >= 800) ?? image?.variants.at(-1);
  return (
    <img
      src={fallback?.src ?? src}
      srcSet={image?.variants.map(variant => `${variant.src} ${variant.width}w`).join(', ')}
      sizes={image ? sizes : undefined}
      alt={alt}
      width={image?.width}
      height={image?.height}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : undefined}
      decoding="async"
    />
  );
}
