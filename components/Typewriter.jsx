import { useEffect, useState } from "react"

const Typewriter = ({ text }) => {
  const [displayedText, setDisplayedText] = useState("")
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(displayedText + text[index])
        setIndex(index + 1)
      }, 100)
      return () => {
        clearTimeout(timeout)
      }
    } else {
      const timeout = setTimeout(() => {
        setDisplayedText("")
        setIndex(0)
      }, 1000) // Delay before restarting
      return () => {
        clearTimeout(timeout)
      }
    }
  }, [index, text, displayedText])

  return <span className="typewriter">{displayedText}_</span>
}

export default Typewriter
