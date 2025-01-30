import dynamic from "next/dynamic"

const HomeMain = dynamic(() => import("@/components/home"), { ssr: false })

export default function Home() {
  return (
    <div>
      <HomeMain />
    </div>
  )
}
