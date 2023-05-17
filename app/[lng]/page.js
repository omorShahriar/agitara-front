import { useTranslation } from "@/app/i18n";
import Container from "@/components/layout/Container";
import { getHomePageData } from "@/datalayer/api";
import {
  TypographyH1,
  TypographyH2,
  TypographyH3,
  TypographyLead,
  TypographyMuted,
  TypographyP,
} from "@/components/Typography";
import Image from "next/image";
import { ServiceCard } from "@/components/Card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Slider from "@/components/sliders/MainCarousel";
import Section from "@/components/layout/Section";
import Link from "next/link";
import clsx from "clsx";
import { getStrapiMedia } from "@/lib/media";
import { Button } from "@/components/ui/button";

export default async function Home({ params: { lng } }) {
  const { t } = await useTranslation(lng);
  const {
    heroBlock,
    carouselBlock,
    faqBlock,
    serviceBlock,
    infoBlock,
    featureBlock,
  } = await getHomePageData(lng);
  const { url: heroImgUrl, placeholder } = getStrapiMedia(heroBlock.heroImage);

  return (
    <>
      <div className=" w-full md:h-[calc(100vh-200px)] grid grid-cols-2 relative">
        <div className="md:col-start-2 md:col-span-1 col-start-1 col-span-2 overflow-hidden">
          <Image
            src={heroImgUrl}
            width={952}
            height={672}
            alt="hero image"
            placeholder="blur"
            blurDataURL={placeholder}
            className="object-cover object-left  h-full w-full"
          />
        </div>
        <div className=" md:inset-0 md:absolute md:z-10 col-span-2 mt-8 md:mt-0 flex flex-col justify-center">
          <Container>
            <div className="grid grid-cols-2">
              <div className="md:col-span-1 col-span-2 h-full pr-8 flex flex-col  gap-y-6">
                {" "}
                <TypographyH1 className="text-center md:text-left">
                  {heroBlock.heading}
                </TypographyH1>
                <TypographyLead className="text-center md:text-left">
                  {" "}
                  {heroBlock.subheading}
                </TypographyLead>
                <div className="flex gap-x-8 justify-center md:justify-normal">
                  {heroBlock.ctas.map((cta) => (
                    <Button
                      key={cta.id}
                      size="lg"
                      variant={cta.type === "filled" ? "default" : "outline"}
                      className={clsx([
                        { "bg-emerald-600 text-white": cta.type === "filled" },
                      ])}
                    >
                      {cta.text}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </Container>
        </div>
      </div>
      <div className="bg-emerald-50 ">
        <Container>
          <Section>
            <TypographyH2>{faqBlock.heading}</TypographyH2>
            <TypographyP>{faqBlock.subHeading}</TypographyP>
            <div className="mt-12 space-y-8 ">
              <Accordion type="single" collapsible className="w-full">
                {faqBlock.qaBlock.map((qa) => (
                  <AccordionItem value={qa.id} key={qa.id}>
                    <AccordionTrigger>{qa.question}</AccordionTrigger>
                    <AccordionContent>{qa.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </Section>
        </Container>
      </div>
      <Container>
        <Section>
          <TypographyH2>{serviceBlock.heading}</TypographyH2>
          <TypographyP>{serviceBlock.subheading}</TypographyP>
          <div className="mt-12 md:max-w-3xl max-w-xs mx-auto flex flex-col md:flex-row gap-x-4">
            {serviceBlock.cards.map((card) => {
              const { url } = getStrapiMedia(card.Icon);
              return (
                <ServiceCard key={card.id} iconUrl={url}>
                  {card.title}
                </ServiceCard>
              );
            })}
          </div>
        </Section>
      </Container>
      <div className="bg-emerald-50 ">
        <Container>
          <Section>
            <TypographyH2>{infoBlock.headingBlock.heading}</TypographyH2>
            <TypographyP>{infoBlock.headingBlock.subHeading}</TypographyP>
            <div className="mt-12 flex gap-x-8 items-center justify-center">
              {infoBlock.ctas.map((cta) => (
                <Button
                  key={cta.id}
                  size="lg"
                  variant={cta.type === "outline" ? "outline" : "default"}
                  asChild
                >
                  <Link href={cta.url}>{cta.text}</Link>
                </Button>
              ))}
            </div>
          </Section>
        </Container>
      </div>

      <Container>
        <Section>
          <TypographyH2>{featureBlock.headingBlock.heading}</TypographyH2>
          <TypographyP>{featureBlock.headingBlock.subHeading}</TypographyP>
          <div className="mt-12 grid grid-cols-12 gap-8">
            {featureBlock.cards.map((card) => {
              const { url } = getStrapiMedia(card.Icon);
              return (
                <div
                  key={card.id}
                  className="md:col-span-3 col-span-6 flex flex-col  gap-y-4"
                >
                  <div className="space-y-2 flex flex-col items-center">
                    <Image
                      alt={card.title}
                      src={url}
                      width={100}
                      height={100}
                    />
                    <TypographyH3>{card.title}</TypographyH3>
                  </div>

                  <TypographyMuted>{card.description}</TypographyMuted>
                </div>
              );
            })}
          </div>
        </Section>
      </Container>

      <Container>
        <Section>
          <Slider slides={carouselBlock.slides} />
        </Section>
      </Container>
    </>
  );
}
