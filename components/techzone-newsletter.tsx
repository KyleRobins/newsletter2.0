'use client'

import React, { useState, useRef, FormEvent } from 'react';
import {  Check, X, Search, Twitter, Youtube, Linkedin, Github, Instagram, Music2, MessageCircle } from 'lucide-react';
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const CardWithForm = () => {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Choose Your Tech Track</CardTitle>
        <CardDescription>Subscribe to your preferred tech track.</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Your name" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="Your email" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="track">Tech Track</Label>
              <Select>
                <SelectTrigger id="track">
                  <SelectValue placeholder="Select a track" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="devops">DevOps</SelectItem>
                  <SelectItem value="software-engineering">Software Engineering</SelectItem>
                  <SelectItem value="data-science">Data Science</SelectItem>
                  <SelectItem value="cybersecurity">Cybersecurity</SelectItem>
                  <SelectItem value="blockchain-web3">Blockchain & Web3</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Subscribe</Button>
      </CardFooter>
    </Card>
  )
}

const TechzoneHeader = () => {
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const dismissMessages = () => {
    setSuccessMessage(null);
    setErrorMessage('');
  };

  return (
    <div className="bg-black text-white min-h-screen flex flex-col">
      <header className="container mx-auto px-4 py-6">
        <nav className="flex justify-between items-center">
          <div className="text-2xl font-bold">Techzone</div>
          <ul className="flex space-x-6">
            <li>About</li>
            <li>Blog</li>
            <li>Merch</li>
            <li>Events</li>
          </ul>
          <div>
            <Search className="w-6 h-6" />
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-12 flex flex-col items-center flex-grow">
        <h1 className="text-4xl font-bold mb-4">
          Join the Techzone Newsletter
        </h1>
        <div className="w-full max-w-md">
          <div className="mt-10 text-center">
            <p className="text-lg text-gray-300">
              For developers, cybersecurity enthusiasts, DevOps engineers, and
              Web3 engineers: Daily dose of What's New and What's Trending in
              Tech.
            </p>
          </div>

          <div className="relative mt-4">
            {(successMessage || errorMessage) && (
              <div className="flex items-start space-x-2 bg-[#0A0E12] shadow-outline-gray text-white rounded-[9px] py-4 px-6 animate-fade-bottom absolute">
                <div className="h-6 w-6 bg-[#1B2926] flex items-center justify-center rounded-full border border-[#273130] flex-shrink-0">
                  <Check className="h-4 w-4 text-[#81A89A]" />
                </div>
                <div className="text-xs sm:text-sm text-[#4B4C52]">
                  {successMessage ? (
                    <p>{successMessage}</p>
                  ) : (
                    <p>{errorMessage}</p>
                  )}
                </div>
                <X
                  className="h-5 w-5 cursor-pointer flex-shrink-0 text-[#4A4B55]"
                  onClick={dismissMessages}
                />
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="bg-black py-12 px-4">
        <div className="max-w-6xl mx-auto flex justify-center">
          <CardWithForm />
        </div>
      </footer>

      <div className="bg-black py-4 px-6">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            {/* <Select>
              <SelectTrigger className="bg-gray-800 text-white border-none">
                <SelectValue placeholder="English (US)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en-us">English (US)</SelectItem>
                <SelectItem value="es">Español</SelectItem>
                <SelectItem value="fr">Français</SelectItem>
              </SelectContent>
            </Select> */}
            <span className="text-gray-500">Techzone © 2015-2024</span>
          </div>
          <div className="flex space-x-4">
            <Twitter className="w-5 h-5 text-gray-500 hover:text-white cursor-pointer" />
            <Youtube className="w-5 h-5 text-gray-500 hover:text-white cursor-pointer" />
            <Linkedin className="w-5 h-5 text-gray-500 hover:text-white cursor-pointer" />
            <Github className="w-5 h-5 text-gray-500 hover:text-white cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechzoneHeader;