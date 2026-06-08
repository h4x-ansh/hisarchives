"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArchiveFrame } from "@/components/archive-frame";

const communicationLinks = [
  { label: "Email", value: "anuneet.og@gmail.com", href: "mailto:anuneet.og@gmail.com" },
  { label: "GitHub", value: "@h4x-ansh", href: "https://github.com/h4x-ansh" },
  { label: "Discord", value: "11.11arc", href: "https://discord.com/" },
  { label: "Other", value: "Project mirror / Notes index", href: "https://example.com" },
] as const;

const skillSet = ["JEE 2027", "HisArchives", "Fitness", "Projects"] as const;
const interests = ["Technology", "Engineering", "Design", "Product Building", "Archives", "Self Improvement"] as const;
const technicalSkills = [
  "Web Development",
  "Automation",
  "UI Design",
  "Documentation",
  "Problem Solving",
  "Content Creation",
] as const;

function SectionTitle({ title }: { title: string }) {
  return <h2 className="text-3xl font-extrabold italic tracking-tight text-white sm:text-4xl">{title}</h2>;
}

function Divider() {
  return <span className="mx-4 hidden h-9 w-px bg-white/30 sm:block" />;
}

export function IdentityPage() {
  const reduceMotion = useReducedMotion();

  return (
    <ArchiveFrame activePath="/me">
      <section className="border-t border-white/5 py-10 sm:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-[2.5rem] bg-[linear-gradient(180deg,#111226_0%,#19152f_100%)] px-4 py-5 shadow-[0_30px_120px_rgba(0,0,0,0.35)] sm:px-6 sm:py-6 lg:px-8 lg:py-8">
            <div className="absolute inset-0 overflow-hidden rounded-[2.5rem]">
              <div className="absolute -right-20 -top-16 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl" />
              <div className="absolute left-[-8rem] top-28 h-80 w-80 rounded-full bg-violet-500/18 blur-3xl" />
              <div className="absolute right-24 top-8 h-72 w-72 rounded-full bg-purple-400/10 blur-3xl" />
            </div>

            <div className="relative grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(20rem,0.85fr)] lg:items-center">
              <div className="space-y-8">
                <div className="inline-flex rounded-[1.5rem] bg-[linear-gradient(90deg,#8f63ff_0%,#8d5cff_42%,#5d4bff_100%)] px-7 py-4 shadow-[0_12px_40px_rgba(112,78,255,0.25)] sm:px-10 sm:py-5">
                  <h1 className="text-4xl font-extrabold italic tracking-tight text-white sm:text-5xl lg:text-6xl">
                    IDENTITY RECORD
                  </h1>
                </div>

                <div className="max-w-2xl space-y-5 text-white/90">
                  <p className="text-sm uppercase tracking-[0.45em] text-white/60">Ansh</p>
                  <p className="text-base leading-8 text-white/85 sm:text-lg">
                    Hi! I am building HisArchives as a living archive of projects, progress, and records.
                    The work is ongoing, the system is active, and the record keeps growing.
                  </p>
                  <p className="text-base leading-8 text-white/75 sm:text-lg">
                    Current directive: JEE 2027. Identity, discipline, and documentation are the core systems behind the archive.
                  </p>
                </div>

                <div className="space-y-4">
                  <SectionTitle title="COMMUNICATION TERMINAL" />
                  <div className="grid gap-3 sm:grid-cols-2">
                    {communicationLinks.map((link) => (
                      <Link
                        key={link.label}
                        href={link.href}
                        target={link.href.startsWith("http") ? "_blank" : undefined}
                        rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                        className="flex items-center justify-between rounded-full bg-white/8 px-5 py-4 text-white/90 backdrop-blur-sm transition hover:bg-white/12"
                      >
                        <div>
                          <p className="text-[0.68rem] uppercase tracking-[0.4em] text-white/55">{link.label}</p>
                          <p className="mt-2 text-sm font-medium sm:text-base">{link.value}</p>
                        </div>
                        <span className="text-white/45">↗</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <div className="relative flex justify-center lg:justify-end">
                <div className="relative h-[24rem] w-[16rem] sm:h-[28rem] sm:w-[18rem] lg:h-[30rem] lg:w-[20rem]">
                  <motion.div
                    aria-hidden
                    className="absolute inset-[-18%] rounded-[3rem] bg-[radial-gradient(circle_at_55%_40%,rgba(142,208,255,0.38),rgba(128,92,255,0.12)_36%,transparent_72%)] blur-3xl"
                    animate={reduceMotion ? undefined : { opacity: [0.7, 0.95, 0.7], scale: [1, 1.03, 1] }}
                    transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <div className="absolute inset-0 rounded-[3rem] border border-white/20 bg-white/5 shadow-[0_18px_70px_rgba(0,0,0,0.35)] backdrop-blur-sm" />
                  <div className="absolute inset-[0.45rem] rounded-[2.6rem] border border-white/10 bg-[linear-gradient(180deg,rgba(12,13,28,0.15),rgba(12,13,28,0.02))]" />
                  <motion.div
                    animate={reduceMotion ? undefined : { y: [0, -5, 0] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-0 overflow-hidden rounded-[2.6rem]"
                  >
                    <Image
                      src="/potrait-fotor-bg-remover-20260606231944.png"
                      alt="Ansh portrait"
                      fill
                      priority
                      sizes="(max-width: 1024px) 16rem, 20rem"
                      className="object-contain object-center"
                    />
                  </motion.div>
                  <div className="absolute inset-0 rounded-[2.6rem] bg-[radial-gradient(circle_at_50%_25%,rgba(125,208,255,0.2),transparent_34%),radial-gradient(circle_at_50%_70%,rgba(167,126,255,0.16),transparent_40%)]" />
                  <div className="absolute inset-x-[12%] bottom-[10%] h-24 rounded-full bg-cyan-200/15 blur-3xl" />
                  <div className="absolute inset-x-[18%] top-[18%] h-16 rounded-full bg-white/10 blur-3xl" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-white/5 py-8 sm:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-[3rem] border border-white/8 bg-[linear-gradient(180deg,rgba(18,15,30,0.9)_0%,rgba(12,11,22,0.95)_100%)] px-5 py-8 shadow-[0_30px_100px_rgba(0,0,0,0.35)] sm:px-8 sm:py-10 lg:px-10 lg:py-12">
            <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(139,92,246,0.18),transparent_28%),radial-gradient(circle_at_top_right,rgba(59,130,246,0.12),transparent_24%),radial-gradient(circle_at_bottom_left,rgba(34,197,94,0.08),transparent_22%)]" />
            <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-12">
              <div className="space-y-8">
                <div className="space-y-3">
                  <h2 className="text-3xl font-extrabold italic tracking-tight text-white sm:text-4xl">Education</h2>
                  <div className="inline-flex rounded-full border border-white/35 px-5 py-2 text-sm text-white/95">Class 11</div>
                  <p className="text-sm uppercase tracking-[0.32em] text-white/75">JEE 2027 Preparation</p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-3xl font-extrabold italic tracking-tight text-white sm:text-4xl">Technical skill</h3>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {technicalSkills.map((skill) => (
                      <div key={skill} className="rounded-2xl border border-white/25 bg-white/10 px-4 py-4 text-sm font-medium text-white shadow-[0_10px_30px_rgba(0,0,0,0.12)]">
                        {skill}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <div className="space-y-3">
                  <h3 className="text-3xl font-extrabold italic tracking-tight text-white sm:text-4xl">Skill set</h3>
                  <div className="flex flex-wrap gap-3">
                    {skillSet.map((item) => (
                      <span key={item} className="rounded-full border border-white/35 bg-white/10 px-4 py-2 text-sm text-white/95">{item}</span>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-3xl font-extrabold italic tracking-tight text-white sm:text-4xl">Interest</h3>
                  <div className="flex flex-wrap gap-3">
                    {interests.map((item) => (
                      <span key={item} className="rounded-full border border-white/20 bg-white/8 px-4 py-2 text-sm text-white/90">{item}</span>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-3xl font-extrabold italic tracking-tight text-white sm:text-4xl">Language</h3>
                  <div className="flex items-center gap-4 text-white/90">
                    <span>English</span>
                    <Divider />
                    <span>Hindi</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-3xl font-extrabold italic tracking-tight text-white sm:text-4xl">Availability Status</h3>
                  <div className="rounded-[2rem] border border-white/20 bg-white/10 px-5 py-5 text-white/92">
                    <p className="text-sm uppercase tracking-[0.4em] text-white/70">Current state</p>
                    <p className="mt-3 text-lg font-medium">Building steadily</p>
                    <p className="mt-3 text-sm leading-7 text-white/80">Response window: evenings and nights. Active focus: JEE 2027 and archive work.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </ArchiveFrame>
  );
}
