'use client'

import { Star } from '@phosphor-icons/react/dist/ssr/Star'
import { useState } from 'react'
import { twMerge } from 'tailwind-merge'

interface RatingProps {
  maxRating: number
  initialRating: number
  onRatingChange?: (rating: number) => void
  readOnly?: boolean
}

export const Rating = ({
  maxRating,
  initialRating,
  onRatingChange,
  readOnly,
}: RatingProps) => {
  const [rating, setRating] = useState(initialRating)

  const handleRatingClick = (newRating: number) => {
    setRating(newRating)
    if (onRatingChange) {
      onRatingChange(newRating)
    }
  }

  const renderStars = () => {
    const stars = []
    for (let i = 1; i <= maxRating; i++) {
      stars.push(
        <Star
          onClick={() => {
            if (!readOnly) {
              handleRatingClick(i)
            }
          }}
          key={i}
          className={twMerge(
            i <= rating ? 'text-[#FF9017]' : 'text-[#D4CDC5]',
            !readOnly && 'cursor-pointer',
          )}
          size={16}
          weight="fill"
        />,
      )
    }
    return stars
  }

  return <div className="flex items-center gap-1">{renderStars()}</div>
}
