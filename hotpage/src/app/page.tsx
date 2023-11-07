import FeatureSwiper from "@/components/FeatureSwiper";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import AppShow from "@/home/AppShow";
import MainPage from "@/home/MainPage";

export default function Home() {
	return (
		<main className="w-full min-h-screen pt-24">
			<Navbar />
			<MainPage />
			<AppShow />
			<FeatureSwiper />
			<Footer />
		</main>
	);
}
