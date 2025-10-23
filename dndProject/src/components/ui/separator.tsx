import * as SeparatorPrimitive from '@radix-ui/react-separator';
import { cn } from '@/lib/utils';

type EdgeColor =
  | 'brand-50'
  | 'brand-100'
  | 'brand-200'
  | 'brand-300'
  | 'brand-400'
  | 'brand-500'
  | string;

type EdgeSide = 'left' | 'right' | 'both';

type SeparatorProps = React.ComponentProps<typeof SeparatorPrimitive.Root> & {
  spacing?: 'default' | 'equalSmall' | 'equalLarge' | 'empty';
  edgeEffect?: 'none' | 'gradient' | 'block';
  edgeColor?: EdgeColor;
  edgeSide?: EdgeSide;
};

export function Separator({
  className,
  orientation = 'horizontal',
  decorative = true,
  spacing = 'default',
  edgeEffect = 'none',
  edgeColor = 'brand-500',
  edgeSide = 'both',
  ...props
}: SeparatorProps) {
  let marginClass = '';
  if (orientation === 'horizontal') {
    switch (spacing) {
      case 'equalSmall':
        marginClass = '!h-[2px] mt-[12px] mb-[12px]';
        break;
      case 'equalLarge':
        marginClass = '!h-[2px] mt-[22px] mb-[22px]';
        break;
      case 'empty':
        marginClass = '!h-[2px] mt-0 mb-0';
        break;
      default:
        marginClass = '!h-[2px] mt-[22px] mb-[12px]';
    }
  }

  const colorVar = `var(--color-${edgeColor})`;
  const blockSize = 8; // ширина/высота ромбика до поворота

  const sides: Array<'left' | 'right'> = edgeSide === 'both' ? ['left', 'right'] : [edgeSide];

  // урезаем именно на полный blockSize
  const leftOffset = sides.includes('left') && edgeEffect === 'block' ? blockSize : 0;
  const rightOffset = sides.includes('right') && edgeEffect === 'block' ? blockSize : 0;

  return (
    <SeparatorPrimitive.Root
      data-slot="separator"
      decorative={decorative}
      orientation={orientation}
      className={cn('bg-border shrink-0 relative', 'bg-brand-200', marginClass, className)}
      style={{
        width: `calc(100% - ${leftOffset + rightOffset + 2}px)`,
        marginLeft: leftOffset ? `${leftOffset}px` : undefined,
        marginRight: rightOffset ? `${rightOffset}px` : undefined,
      }}
      {...props}>
      {edgeEffect === 'gradient' &&
        orientation === 'horizontal' &&
        sides.map((side) => (
          <div
            key={side}
            className="absolute top-0 h-full"
            style={{
              width: '20%',
              [side]: 0,
              background:
                side === 'left'
                  ? `linear-gradient(to right, ${colorVar}, transparent)`
                  : `linear-gradient(to left, ${colorVar}, transparent)`,
            }}
          />
        ))}

      {edgeEffect === 'block' &&
        sides.map((side) => (
          <div
            key={side}
            className="absolute w-2 h-2 bg-transparent"
            style={{
              border: `2px solid ${colorVar}`,
              top: '50%',
              transform: `translateY(-50%) ${
                side === 'left' ? 'translateX(-50%)' : 'translateX(50%)'
              } rotate(45deg)`,
              [side]: `-${blockSize / 2}px`,
            }}
          />
        ))}
    </SeparatorPrimitive.Root>
  );
}
