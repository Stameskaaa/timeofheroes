import { EmblaCarouselType } from 'embla-carousel';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import React, { ComponentPropsWithRef, useCallback, useEffect, useState } from 'react';

type UsePrevNextButtonsType = {
  prevBtnDisabled: boolean;
  nextBtnDisabled: boolean;
  onPrevButtonClick: () => void;
  onNextButtonClick: () => void;
};

export const usePrevNextButtons = (
  emblaApi: EmblaCarouselType | undefined,
  onButtonClick?: (emblaApi: EmblaCarouselType) => void,
): UsePrevNextButtonsType => {
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

  const onPrevButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollPrev();
    if (onButtonClick) onButtonClick(emblaApi);
  }, [emblaApi, onButtonClick]);

  const onNextButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollNext();
    if (onButtonClick) onButtonClick(emblaApi);
  }, [emblaApi, onButtonClick]);

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect(emblaApi);
    emblaApi.on('reInit', onSelect).on('select', onSelect);
  }, [emblaApi, onSelect]);

  return {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  };
};

type PropType = ComponentPropsWithRef<'button'>;

export const PrevButton: React.FC<PropType> = (props) => {
  const { children, ...restProps } = props;

  return (
    <button
      type="button"
      className="pointer-events-auto appearance-none group hover:scale-110 duration-400 active:scale-100 !w-[64px] !h-[64px] flex items-center justify-center cursor-pointer bg-transparent rounded-full transition-all border-brand-100 border-1 !outline-none"
      {...restProps}>
      <div className="!w-[50px] !h-[50px] flex items-center justify-center rounded-full border-brand-100 border-2">
        <div className="rounded-full bg-brand-400">
          <div className="!w-[36px] !h-[36px] text-brand-100 flex items-center justify-center">
            <ChevronLeft
              size={20}
              className="group-hover:-translate-x-2 transition-transform duration-400"
            />
          </div>
        </div>
      </div>
      {children}
    </button>
  );
};

export const NextButton: React.FC<PropType> = (props) => {
  const { children, ...restProps } = props;

  return (
    <button
      type="button"
      className="pointer-events-auto appearance-none group hover:scale-110 duration-400 active:scale-100 !w-[64px] !h-[64px] flex items-center justify-center cursor-pointer bg-transparent rounded-full transition-all border-brand-100 border-1 !outline-none"
      {...restProps}>
      <div className="!w-[50px] !h-[50px] flex items-center justify-center rounded-full border-brand-100 border-2">
        <div className="rounded-full bg-brand-400">
          <div className="!w-[36px] !h-[36px] text-brand-100 flex items-center justify-center">
            <ChevronRight
              size={20}
              className="group-hover:translate-x-2 transition-transform duration-400"
            />
          </div>
        </div>
      </div>
      {children}
    </button>
  );
};
