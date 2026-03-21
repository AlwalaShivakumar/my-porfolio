import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { GithubStats } from "@/components/sections/GithubStats";
import { Contact } from "@/components/sections/Contact";
import { getGitHubUser, getGitHubRepos } from "@/lib/github";

export default async function Home() {
  const githubUser = await getGitHubUser();
  const githubRepos = await getGitHubRepos();

  return (
    <>
      <Hero />
      <About githubUser={githubUser} />
      <Skills />
      <Experience />
      <Projects repos={githubRepos} />
      <GithubStats />
      <Contact />
    </>
  );
}
