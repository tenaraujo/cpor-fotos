import Hero from "./Hero";
import Stats from "./Stats";
import Categories from "./Categories";

export default function HomePage() {
  return (
    <>
      <Hero />

      <Stats />

      <div id="categories">
        <Categories />
      </div>
    </>
  );
}