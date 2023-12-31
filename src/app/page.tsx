// Components
import FeaturedPosts from "@/components/FeaturedPosts";
import CarouselPosts from "@/components/CarouselPosts";
import Profile from "@/components/Profile";

export default function HomePage() {
  return (
    <>
      <Profile />
      {/* @ts-expect-error Server Component */}
      <FeaturedPosts />
      {/* @ts-expect-error Server Component */}
      <CarouselPosts />
    </>
  );
}
