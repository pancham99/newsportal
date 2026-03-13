import { base_api_url } from "../config/config";
import HomeSection from "../components/Home/HomeSection";

const Home = async () => {
  const news_data = await fetch(`${base_api_url}/api/all/news`, {
    next: {
      revalidate: 300
    },
  });

  const { news } = await news_data?.json()


  return (

 <>

 <HomeSection news={news} />
 </>
  );
}
export default Home















