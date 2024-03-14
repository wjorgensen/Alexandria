import React from 'react'
import { EmblaOptionsType } from 'embla-carousel'
import { PrevButton, NextButton, usePrevNextButtons } from '../EmblaCarouselArrowButtons'
import useEmblaCarousel from 'embla-carousel-react'
import s from './carousel.module.scss'

type CarouselProps = {
    slides: JSX.Element[]
    options?: EmblaOptionsType
    type: "quarter" | "third" | "half" | "full"
}

export default function Carousel(props: CarouselProps) {
    const { slides, options } = props
    const [emblaRef, emblaApi] = useEmblaCarousel(options)

    const {
        prevBtnDisabled,
        nextBtnDisabled,
        onPrevButtonClick,
        onNextButtonClick
    } = usePrevNextButtons(emblaApi)

    function type() {
        if (props.type === "quarter") {
            return s.quarter
        }
        if (props.type === "third") {
            return s.third
        }
        if (props.type === "half") {
            return s.half
        }
        if (props.type === "full") {
            return s.full
        }
    }

    return (
        <section className={s.carousel}>
            <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
            <div className={s.viewport} ref={emblaRef}>
                <div className={s.emblacontainer}>
                    {slides.map((e, index) => (
                        <div className={`${s.slide} ${type()}`} key={index}>
                            <div className={s.number}>{e}</div>
                        </div>
                    ))}
                </div>
            </div>
            <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </section>
    )
}