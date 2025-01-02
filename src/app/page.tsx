import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CommandMenu } from "@/components/command-menu";
import { TerminalModal } from "@/components/terminal-modal";
import { Metadata } from "next";
import { Section } from "@/components/ui/section";
import { GlobeIcon, MailIcon, PhoneIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RESUME_DATA } from "@/data/resume-data";
import { ProjectCard } from "@/components/project-card";
import { ParticlesBackground } from "@/components/particles-background";

export default function Page() {
  return (
    <div className="relative min-h-screen w-full">
      <ParticlesBackground />
      <main className="bg-mocha-base container relative mx-auto min-h-screen scroll-my-12 overflow-auto p-4 md:p-16 print:p-12">
        <section className="bg-mocha-base mx-auto w-full max-w-4xl space-y-10 print:space-y-8">
          <div className="flex items-center justify-between">
            <div className="flex-1 space-y-2">
              <h1 className="from-mocha-mauve to-mocha-blue font-hack bg-gradient-to-r bg-clip-text text-3xl font-bold text-transparent">
                {RESUME_DATA.name}
              </h1>
              <p className="text-mocha-text text-pretty font-mono text-base">
                {RESUME_DATA.about}
              </p>
              <p className="text-mocha-subtext max-w-xl items-center text-pretty font-mono text-sm">
                <a
                  className="hover:text-mocha-blue inline-flex gap-x-1.5 align-baseline leading-none transition-colors"
                  href={RESUME_DATA.locationLink}
                  target="_blank"
                >
                  <GlobeIcon className="size-4" />
                  {RESUME_DATA.location}
                </a>
              </p>
              <div className="text-mocha-subtext flex gap-x-1.5 pt-1.5 font-mono text-base print:hidden">
                {RESUME_DATA.contact.email ? (
                  <Button
                    className="hover:bg-mocha-surface hover:text-mocha-blue size-9 transition-colors"
                    variant="outline"
                    size="icon"
                    asChild
                  >
                    <a href={`mailto:${RESUME_DATA.contact.email}`}>
                      <MailIcon className="size-4" />
                    </a>
                  </Button>
                ) : null}
                {RESUME_DATA.contact.tel ? (
                  <Button
                    className="hover:bg-mocha-surface hover:text-mocha-blue size-9 transition-colors"
                    variant="outline"
                    size="icon"
                    asChild
                  >
                    <a href={`tel:${RESUME_DATA.contact.tel}`}>
                      <PhoneIcon className="size-4" />
                    </a>
                  </Button>
                ) : null}
                {RESUME_DATA.contact.social.map((social) => (
                  <Button
                    key={social.name}
                    className="hover:bg-mocha-surface hover:text-mocha-blue size-9 transition-colors"
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
              <div className="text-mocha-subtext hidden flex-col gap-x-1.5 font-mono text-base print:flex">
                {RESUME_DATA.contact.email ? (
                  <a href={`mailto:${RESUME_DATA.contact.email}`}>
                    <span className="underline">
                      {RESUME_DATA.contact.email}
                    </span>
                  </a>
                ) : null}
                {RESUME_DATA.contact.tel ? (
                  <a href={`tel:${RESUME_DATA.contact.tel}`}>
                    <span className="underline">{RESUME_DATA.contact.tel}</span>
                  </a>
                ) : null}
              </div>
            </div>

            <Avatar className="ring-mocha-mauve size-32 ring-2">
              <AvatarImage alt={RESUME_DATA.name} src={RESUME_DATA.avatarUrl} />
              <AvatarFallback>{RESUME_DATA.initials}</AvatarFallback>
            </Avatar>
          </div>
          <Section title="about">
            <p className="text-mocha-text text-pretty font-mono text-base">
              {RESUME_DATA.summary}
            </p>
          </Section>
          <Section title="work">
            {RESUME_DATA.work.map((work) => {
              return (
                <div key={work.company} className="mb-3 last:mb-0">
                  <div className="bg-mocha-surface/50 hover:bg-mocha-surface group relative flex flex-col gap-2.5 rounded-lg p-5 transition-all">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2.5">
                          <h3 className="text-mocha-text text-lg font-medium leading-none">
                            {work.company}
                          </h3>
                          {work.badges?.map((badge) => (
                            <Badge
                              key={badge}
                              className="bg-mocha-mauve/20 text-mocha-mauve border-none text-sm"
                            >
                              {badge}
                            </Badge>
                          ))}
                        </div>
                        <div className="text-mocha-pink mt-1.5 text-base font-medium">
                          {work.title}
                        </div>
                      </div>
                      <div className="text-mocha-subtext text-sm tabular-nums">
                        {work.start} - {work.end}
                      </div>
                    </div>

                    <div className="text-mocha-subtext text-sm">
                      {work.description}
                    </div>
                  </div>
                </div>
              );
            })}
          </Section>

          <Section title="education">
            {RESUME_DATA.education.map((education) => {
              return (
                <div key={education.school} className="mb-3 last:mb-0">
                  <div className="bg-mocha-surface/50 hover:bg-mocha-surface group relative flex flex-col gap-2.5 rounded-lg p-5 transition-all">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <h3 className="text-mocha-text text-lg font-medium leading-none">
                          {education.school}
                        </h3>
                        <div className="text-mocha-subtext mt-1.5 text-base">
                          {education.degree}
                        </div>
                      </div>
                      <div className="text-mocha-subtext text-sm tabular-nums">
                        {education.start} - {education.end}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </Section>
          <Section
            title="projects"
            className="print-force-new-page scroll-mb-16"
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
                className="text-mocha-subtext hover:text-mocha-blue inline-flex cursor-pointer items-center gap-1.5 font-mono text-base transition-colors"
              >
                <span>all projects</span>
                <span className="relative top-[1px]">→</span>
              </a>
            </div>
          </Section>
        </section>
        <CommandMenu
          links={[
            {
              url: RESUME_DATA.personalWebsiteUrl,
              title: "blog",
            },
            ...RESUME_DATA.contact.social.map((socialMediaLink) => ({
              url: socialMediaLink.url,
              title: socialMediaLink.name,
            })),
          ]}
        />
        <TerminalModal />
      </main>
    </div>
  );
}
