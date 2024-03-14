import React from 'react'
import { EmblaOptionsType } from 'embla-carousel'
import {
    PrevButton,
    NextButton,
    usePrevNextButtons
} from '../EmblaCarouselArrowButtons'
import useEmblaCarousel from 'embla-carousel-react'

import s from './carousel.module.scss'

type PropType = {
    slides: number[]
    options?: EmblaOptionsType
}

const EmblaCarousel: React.FC<PropType> = (props) => {
    const { slides, options } = props
    const [emblaRef, emblaApi] = useEmblaCarousel(options)

    const {
        prevBtnDisabled,
        nextBtnDisabled,
        onPrevButtonClick,
        onNextButtonClick
    } = usePrevNextButtons(emblaApi)

    return (
        <section className={s.carousel}>
            <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
            <div className={s.viewport} ref={emblaRef}>
                <div className={s.emblacontainer}>
                    {slides.map((index) => (
                        <div className={s.slide} key={index}>
                            <div className={s.number}>{index + 1}</div>
                        </div>
                    ))}
                </div>
            </div>
            <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </section>
    )
}

export default EmblaCarousel