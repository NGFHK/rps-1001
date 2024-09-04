import { Typography } from "@mui/material"
import { styled } from '@mui/system'
import { useState } from "react"

/**
 * @see https://css-tricks.com/books/greatest-css-tricks/squigglevision/
 */
const SquigglyFilters = () => (
  <svg xmlns="http://www.w3.org/2000/svg" version="1.1" style={{ display: 'none' }}>
    <defs>
      {[...Array(5).keys()].map((i) => (
        <filter key={i} id={`squiggly-${i}`}>
          <feTurbulence baseFrequency="0.03" numOctaves="2" result="noise" seed={i} />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale={i % 2 === 0 ? 4 : 8} />
        </filter>
      ))}
    </defs>
  </svg>
)

const SquigglyTypography = styled(Typography)<{ isAnimating: boolean }>(({ isAnimating }) => ({
  cursor: "default",
  animation: isAnimating ? `squiggly-anim 0.4s linear infinite` : "none",
  '@keyframes squiggly-anim': {
    '0%': { filter: `url('#squiggly-0')` },
    '25%': { filter: `url('#squiggly-1')` },
    '50%': { filter: `url('#squiggly-2')` },
    '75%': { filter: `url('#squiggly-3')` },
    '100%': { filter: `url('#squiggly-4')` },
  },
}))

const TitleText = () => {
  const [isAnimating, setIsAnimating] = useState(true)

  const handleClick = () => setIsAnimating(!isAnimating)
  const handleMouseEnter = () => setIsAnimating(!isAnimating)

  return (
    <>
      <SquigglyFilters />
      <SquigglyTypography
        variant="h1" fontSize="4rem"
        isAnimating={isAnimating} onClick={handleClick} onMouseEnter={handleMouseEnter}
      >
        RPS-1001
      </SquigglyTypography>
    </>
  )
}

export default TitleText
