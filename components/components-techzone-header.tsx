"use client";

import React, { useState, useEffect, FormEvent } from "react";
import {
  Search,
  Twitter,
  Youtube,
  Linkedin,
  Github,
  Instagram,
  Music2,
  MessageCircle,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Toaster, toast } from "sonner";

const translations = {
  "en-us": {
    webinar: "1000 + 🎉",
    migrating: "Tech Updates Sent Out 📬",
    heroTitle:
      "For developers, cybersecurity enthusiasts, DevOps engineers, and Web3 engineers",
    heroDescription:
      "Techzone is your ultimate tech news source. Start your journey with daily updates on the latest in tech, from AI breakthroughs to startup innovations.",
    subscribe: "Subscribe",
    learnMore: "Learn More",
    about: "About",
    blog: "Blog",
    merch: "Merch",
    events: "Events",
    chooseTrack: "Choose Your Tech Track",
    subscribeTrack: "Subscribe to your preferred tech track.",
    name: "Name",
    email: "Email",
    track: "Tech Track",
    cancel: "Cancel",
    subscribing: "Subscribing...",
    copyright: "Techzone © 2015-2024",
  },
  es: {
    webinar: "1000 + 🎉",
    migrating: "Tech Updates Sent Out 📬",
    heroTitle:
      "Para desarrolladores, entusiastas de la ciberseguridad, ingenieros DevOps e ingenieros Web3",
    heroDescription:
      "Techzone es tu fuente definitiva de noticias tecnológicas. Comienza tu viaje con actualizaciones diarias sobre lo último en tecnología, desde avances en IA hasta innovaciones en startups.",
    subscribe: "Suscribirse",
    learnMore: "Más información",
    about: "Acerca de",
    blog: "Blog",
    merch: "Mercancía",
    events: "Eventos",
    chooseTrack: "Elige tu pista tecnológica",
    subscribeTrack: "Suscríbete a tu pista tecnológica preferida.",
    name: "Nombre",
    email: "Correo electrónico",
    track: "Pista tecnológica",
    cancel: "Cancelar",
    subscribing: "Suscribiendo...",
    copyright: "Techzone © 2015-2024",
  },
  fr: {
    webinar: "1000 + 🎉",
    migrating: "Tech Updates Sent Out 📬",
    heroTitle:
      "Pour les développeurs, les passionnés de cybersécurité, les ingénieurs DevOps et les ingénieurs Web3",
    heroDescription:
      "Techzone est votre source ultime d'actualités technologiques. Commencez votre voyage avec des mises à jour quotidiennes sur les dernières avancées technologiques, des percées en IA aux innovations des startups.",
    subscribe: "S'abonner",
    learnMore: "En savoir plus",
    about: "À propos",
    blog: "Blog",
    merch: "Boutique",
    events: "Événements",
    chooseTrack: "Choisissez votre parcours technologique",
    subscribeTrack: "Abonnez-vous à votre parcours technologique préféré.",
    name: "Nom",
    email: "E-mail",
    track: "Parcours technologique",
    cancel: "Annuler",
    subscribing: "Abonnement en cours...",
    copyright: "Techzone © 2015-2024",
  },
  de: {
    webinar: "1000 + 🎉",
    migrating: "Tech Updates Sent Out 📬",
    heroTitle:
      "Für Entwickler, Cybersecurity-Enthusiasten, DevOps-Ingenieure und Web3-Ingenieure",
    heroDescription:
      "Techzone ist Ihre ultimative Quelle für Tech-News. Beginnen Sie Ihre Reise mit täglichen Updates zu den neuesten Technologien, von KI-Durchbrüchen bis hin zu Startup-Innovationen.",
    subscribe: "Abonnieren",
    learnMore: "Mehr erfahren",
    about: "Über uns",
    blog: "Blog",
    merch: "Merchandise",
    events: "Veranstaltungen",
    chooseTrack: "Wählen Sie Ihren Tech-Track",
    subscribeTrack: "Abonnieren Sie Ihren bevorzugten Tech-Track.",
    name: "Name",
    email: "E-Mail",
    track: "Tech-Track",
    cancel: "Abbrechen",
    subscribing: "Abonniere...",
    copyright: "Techzone © 2015-2024",
  },
};

const LogoSlider = () => {
  const logos = [
    {
      src: "https://res.cloudinary.com/dzw5pskk1/image/upload/v1705569058/aws_mncngm.svg",
      alt: "AWS",
    },
    {
      src: "https://res.cloudinary.com/dzw5pskk1/image/upload/v1705569899/google-cloud_c3hlxs.svg",
      alt: "Google Cloud",
    },
    {
      src: "https://res.cloudinary.com/dzw5pskk1/image/upload/v1705570519/microsoft-azure_qsvrrq.svg",
      alt: "Microsoft Azure",
    },
    {
      src: "https://res.cloudinary.com/dzw5pskk1/image/upload/v1705570871/snyk_namkmr.svg",
      alt: "Snyk",
    },
    {
      src: "https://res.cloudinary.com/dzw5pskk1/image/upload/v1705571412/supabase-icon_nngkrc.svg",
      alt: "Supabase",
    },
    {
      src: "https://res.cloudinary.com/dzw5pskk1/image/upload/v1705570859/slack-icon_ivnjrb.svg",
      alt: "Slack",
    },
    {
      src: "https://res.cloudinary.com/dzw5pskk1/image/upload/v1705570176/mailchimp-freddie_qjynqe.svg",
      alt: "Mailchimp"
    },
  ];

  const [position, setPosition] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition((prevPosition) => {
        if (prevPosition <= -100 * logos.length) {
          return 0;
        }
        return prevPosition - 1;
      });
    }, 20);

    return () => clearInterval(interval);
  }, [logos.length]);

  return (
    <div className="overflow-hidden w-full mt-8">
      <div
        className="flex transition-transform duration-1000 ease-linear"
        style={{ transform: `translateX(${position}px)` }}
      >
        {[...logos, ...logos].map((logo, index) => (
          <img
            key={index}
            src={logo.src}
            alt={logo.alt}
            className="mx-4"
            style={{ width: "100px", height: "40px", objectFit: "contain" }}
          />
        ))}
      </div>
    </div>
  );
};

const CardWithForm = ({ t }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [track, setTrack] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const submitForm = () =>
      new Promise((resolve, reject) => {
        // Simulating an API call
        setTimeout(() => {
          if (Math.random() > 0.1) {
            // 90% success rate
            resolve({ name, email, track });
          } else {
            reject(new Error("Subscription failed"));
          }
        }, 2000);
      });

    toast.promise(submitForm, {
      loading: t.subscribing,
      success: (data) => {
        clearForm();
        return `Welcome to Techzone Newsletter, ${name}!`;
      },
      error: "Subscription failed. Please try again.",
    });

    try {
      await submitForm();
    } catch (error) {
      // Error is handled by toast.promise
    } finally {
      setIsLoading(false);
    }
  };

  const clearForm = () => {
    setName("");
    setEmail("");
    setTrack("");
  };

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>{t.chooseTrack}</CardTitle>
        <CardDescription>{t.subscribeTrack}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">{t.name}</Label>
              <Input
                id="name"
                placeholder={t.name}
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">{t.email}</Label>
              <Input
                id="email"
                type="email"
                placeholder={t.email}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="track">{t.track}</Label>
              <Select value={track} onValueChange={setTrack}>
                <SelectTrigger id="track">
                  <SelectValue placeholder={t.track} />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="devops">DevOps</SelectItem>
                  <SelectItem value="software-engineering">
                    Software Engineering
                  </SelectItem>
                  <SelectItem value="data-science">Data Science</SelectItem>
                  <SelectItem value="cybersecurity">Cybersecurity</SelectItem>
                  <SelectItem value="blockchain-web3">
                    Blockchain & Web3
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          variant="outline"
          onClick={clearForm}
          className="border-[hsl(0deg,0%,14.1%)] text-[hsl(0deg,0%,14.1%)] bg-[hsl(0deg,0%,14.1%)] hover:bg-[hsl(0deg,0%,14.1%)] text-white"
        >
          {t.cancel}
        </Button>
        <Button
          type="submit"
          onClick={handleSubmit}
          disabled={isLoading}
          className="border-[hsl(154.9deg,100%,19.2%)] text-[hsl(154.9deg,100%,19.2%)] bg-[hsl(154.9deg,100%,19.2%)] hover:bg-[hsl(154.9deg,100%,19.2%)] text-white"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {t.subscribing}
            </>
          ) : (
            t.subscribe
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Techzone",
  url: "http://yourwebsite.com",
  logo: "http://yourwebsite.com/logo.png",
  sameAs: [
    "http://www.facebook.com/yourprofile",
    "http://www.twitter.com/yourprofile",
    "http://www.instagram.com/yourprofile",
  ],
};

const TechzoneHeader = () => {
  const [language, setLanguage] = useState("en-us");
  const t = translations[language];

  const scrollToForm = () => {
    const form = document.querySelector("form");
    if (form) {
      form.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
      <div className="bg-black text-white min-h-screen flex flex-col">
        <Toaster position="bottom-right" expand={true} />
        <header className="container mx-auto px-4 py-6">
          <nav className="flex justify-between items-center">
            <div className="text-2xl font-bold">Techzone</div>
            <ul className="flex space-x-6">
              <li>{t.about}</li>
              <li>{t.blog}</li>
              <li>{t.merch}</li>
              <li>{t.events}</li>
            </ul>
            <div>
              <Search className="w-6 h-6" />
            </div>
          </nav>
        </header>

        <main className="container mx-auto px-4 py-12 flex flex-col items-center flex-grow">
          <div className="text-center mb-4">
            <span className="bg-green-600 text-white px-2 py-1 rounded-full text-sm">
              {t.webinar}
            </span>
            <span className="ml-2 text-gray-400">23 OCT</span>
            <span className="ml-2">{t.migrating}</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 text-center">
            For developers,{" "}
            <span className="text-emerald-400">DevOps engineers</span>,
            <span className="text-emerald-400">Web3 engineers</span>, and{" "}
            cybersecurity enthusiasts.
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl text-center mb-8">
            {t.heroDescription}
          </p>
          <div className="flex space-x-4">
            <Button
              variant="outline"
              onClick={scrollToForm}
              className="border-[hsl(154.9deg,100%,19.2%)] text-[hsl(154.9deg,100%,19.2%)] bg-[hsl(154.9deg,100%,19.2%)] hover:bg-[hsl(154.9deg,100%,19.2%)] text-white"
            >
              {t.subscribe}
            </Button>
            <Button
              variant="outline"
              className="border-[hsl(0deg,0%,14.1%)] text-[hsl(0deg,0%,14.1%)] bg-[hsl(0deg,0%,14.1%)] hover:bg-[hsl(0deg,0%,14.1%)] text-white"
            >
              {t.learnMore}
            </Button>
          </div>
          <LogoSlider />
        </main>

        <footer className="bg-gray-900 py-12 px-4">
          <div className="max-w-6xl mx-auto flex justify-center">
            <CardWithForm t={t} />
          </div>
        </footer>

        <div className="bg-black py-4 px-6">
          <div className="container mx-auto flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger className="bg-gray-800 text-white border-none">
                  <SelectValue placeholder="English (US)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en-us">English (US)</SelectItem>
                  <SelectItem value="es">Español</SelectItem>
                  <SelectItem value="fr">Français</SelectItem>
                  <SelectItem value="de">Deutsch</SelectItem>
                </SelectContent>
              </Select>
              <span className="text-gray-500">{t.copyright}</span>
            </div>
            <div className="flex space-x-4">
              <Twitter className="w-5 h-5 text-gray-500 hover:text-white cursor-pointer" />
              <Youtube className="w-5 h-5 text-gray-500 hover:text-white cursor-pointer" />
              <Linkedin className="w-5 h-5 text-gray-500 hover:text-white cursor-pointer" />
              <Github className="w-5 h-5 text-gray-500 hover:text-white cursor-pointer" />
              <Instagram className="w-5 h-5 text-gray-500 hover:text-white cursor-pointer" />
              <Music2 className="w-5 h-5 text-gray-500 hover:text-white cursor-pointer" />
              <MessageCircle className="w-5 h-5 text-gray-500 hover:text-white cursor-pointer" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TechzoneHeader;
