import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Section } from "@/components/ui/section";
import { GlobeIcon, MailIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RESUME_DATA } from "@/data/resume-data";
import { ProjectCard } from "@/components/project-card";
import { ParticlesBackground } from "@/components/particles-background";
import TypedText from "@/components/typed-text";
import { FadeIn } from "@/components/fade-in";

export default function Page() {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      <ParticlesBackground />
      <main className="container relative mx-auto min-h-screen scroll-my-12 overflow-auto p-4 pt-24 md:p-16 md:pt-28 print:p-12">
        <section className="mx-auto w-full max-w-4xl space-y-10 print:space-y-8">
          <FadeIn>
            <div className="flex items-center justify-between">
              <div className="flex-1 space-y-2">
                <h1 className="bg-gradient-to-r from-mocha-mauve via-mocha-pink to-mocha-blue bg-clip-text font-hack text-4xl font-bold text-transparent">
                  <TypedText text={RESUME_DATA.name} />
                </h1>
                <p className="text-pretty font-mono text-base text-mocha-text">
                  {RESUME_DATA.about}
                </p>
                <p className="max-w-xl items-center text-pretty font-mono text-sm text-mocha-subtext">
                  <a
                    className="inline-flex gap-x-1.5 align-baseline leading-none transition-colors hover:text-mocha-blue"
                    href={RESUME_DATA.locationLink}
                    target="_blank"
                  >
                    <GlobeIcon className="size-4" />
                    {RESUME_DATA.location}
                  </a>
                </p>
                <div className="flex gap-x-1.5 pt-1.5 font-mono text-base text-mocha-subtext print:hidden">
                  {RESUME_DATA.contact.email ? (
                    <Button
                      className="size-9 transition-colors hover:bg-mocha-surface hover:text-mocha-blue"
                      variant="outline"
                      size="icon"
                      asChild
                    >
                      <a href={`mailto:${RESUME_DATA.contact.email}`}>
                        <MailIcon className="size-4" />
                      </a>
                    </Button>
                  ) : null}
                  {RESUME_DATA.contact.social.map((social) => (
                    <Button
                      key={social.name}
                      className="size-9 transition-colors hover:bg-mocha-surface hover:text-mocha-blue"
                      variant="outline"
                      size="icon"
                      asChild
                    >
                      <a href={social.url}>
                        <social.icon className="size-4" />
                      </a>
                    </Button>
                  ))}
                </div>
              </div>

              <Avatar className="size-32 ring-2 ring-mocha-mauve">
                <AvatarImage
                  alt={RESUME_DATA.name}
                  src={RESUME_DATA.avatarUrl}
                />
                <AvatarFallback>{RESUME_DATA.initials}</AvatarFallback>
              </Avatar>
            </div>
          </FadeIn>

          <FadeIn delay={200}>
            <Section title="hire me">
              <p className="text-pretty font-mono text-base text-mocha-text">
                {RESUME_DATA.hireMe}
              </p>
            </Section>
          </FadeIn>

          <FadeIn delay={400}>
            <Section title="work">
              {RESUME_DATA.work.map((work) => {
                return (
                  <div key={work.company} className="mb-3 last:mb-0">
                    <div className="group relative flex flex-col gap-2.5 rounded-lg bg-mocha-surface/50 p-5 backdrop-blur-sm transition-all hover:bg-mocha-surface">
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2.5">
                            <h3 className="text-lg font-medium leading-none text-mocha-text">
                              {work.company}
                            </h3>
                            {work.badges?.map((badge) => (
                              <Badge
                                key={badge}
                                className="border-none bg-mocha-mauve/20 text-sm text-mocha-mauve"
                              >
                                {badge}
                              </Badge>
                            ))}
                          </div>
                          <div className="mt-1.5 text-base font-medium text-mocha-pink">
                            {work.title}
                          </div>
                        </div>
                        <div className="text-sm tabular-nums text-mocha-subtext">
                          {work.start} - {work.end}
                        </div>
                      </div>
                      <div className="text-sm text-mocha-subtext">
                        {work.description}
                      </div>
                    </div>
                  </div>
                );
              })}
            </Section>
          </FadeIn>

          <FadeIn delay={600}>
            <Section
              title="projects"
              className="print-force-new-page scroll-mb-16"
              id="projects"
            >
              <div className="-mx-3 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 print:grid-cols-3 print:gap-2">
                {RESUME_DATA.projects.map((project) => {
                  return (
                    <ProjectCard
                      key={project.title}
                      title={project.title}
                      description={project.description}
                      tags={project.techStack}
                      link={"link" in project ? project.link.href : undefined}
                      bgImageUrl={project.bgImageUrl}
                    />
                  );
                })}
              </div>
              <div className="mt-5 flex justify-center">
                <a
                  href="https://github.com/ahhcash?tab=repositories"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex cursor-pointer items-center gap-1.5 font-mono text-base text-mocha-subtext transition-colors hover:text-mocha-blue"
                >
                  <span>all projects</span>
                  <span className="relative top-[1px]">→</span>
                </a>
              </div>
            </Section>
          </FadeIn>
        </section>
      </main>
    </div>
  );
}
