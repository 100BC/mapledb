import Image from 'next/image';

interface IconProps {
  src: string;
  width?: number;
  height?: number;
  brand: string;
}

const BrandIcon = ({ src, width = 32, height = 32, brand }: IconProps) => (
  <Image
    src={`/brands/${src}`}
    alt={`${brand} logo`}
    width={width}
    height={height}
    layout="fixed"
    quality={100}
    unoptimized
  />
);

export default BrandIcon;
