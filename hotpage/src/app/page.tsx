import BottomAd from "@/components/BottomAd";
import FeatureSwiper from "@/components/FeatureSwiper";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import AppShow from "@/home/AppShow";
import MainPage from "@/home/MainPage";

export default function Home() {
	return (
		<>
			<Navbar />
			<main className="w-full min-h-screen pt-24">
				<MainPage />
				<AppShow />
				<FeatureSwiper />
				<BottomAd />
			</main>
			<Footer />
		</>
	);
}
