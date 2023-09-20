import FeatureSwiper from "@/components/FeatureSwiper";
import AppShow from "@/home/AppShow";
import MainPage from "@/home/MainPage";

export default function Home() {
	return (
		<main className="w-full min-h-screen pt-24">
			<MainPage />
			<AppShow />
			<FeatureSwiper />
		</main>
	);
}
