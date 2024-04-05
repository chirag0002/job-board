import { Footer } from "@/components/Footer"
import { Header } from "@/components/Header"
import { RecommendedJobs } from "@/components/RecommendedJobs"
import { SuggsestedSearches } from "@/components/SuggsestedSearches"

const page = () => {

  return (
    <div>
      <Header />
      <SuggsestedSearches />
      <RecommendedJobs />
      <Footer />
    </div>
  )
}

export default page