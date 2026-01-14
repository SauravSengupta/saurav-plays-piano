---
title: "Premature Optimization: Building the Perfect Site for Zero Listeners"
description: "I'm a backend engineer. I don't do CSS. So I hired an AI to help me build this site in 48 hours to avoid working on my music."
publishDate: 2026-01-13
---

![Premature Optimization](../../assets/images/vibe-code.jpg)

In software engineering, there is a famous quote: *"Premature optimization is the root of all evil."* It means wasting time making code efficient before you even know if it works or if anyone needs it.

My debut single, **Mist & Mushrooms**, drops on January 16. The logical, efficient thing to do this past weekend would have been to make TikToks, email playlists, and actually market the music. Or, maybe work on making more music.

Naturally, I did none of that.

Instead, I decided to spend the weekend building a brand new website. You know, for my "brand." And I decided to do this from scratch, rather than using something like WordPress or Wix. Because I don't always procrastinate, but when I do, I make sure it consumes my entire weekend.

## The "Backend Dev" Problem

Here's the thing: My career has been built on C++, distributed systems, and cloud infrastructure. I worry about race conditions and latency, not about how to center a `div` or what a `z-index` is. The last time I wrote `href` into an IDE was probably 1995, I'm pretty sure `div` didn't even exist.

In other words, I know my way around software development tools, but I have zero experience with modern front-end development. So of course I thought, "How hard can it be?" And decided to treat it as a fun weekend project.

To bridge the gap between "I know how to code" and "What is CSS?", I paired up with an AI (Gemini) to act as my pair programmer.

## The Stack

I wanted a fast, lightweight website without too many bells and whistles. It was really important to have perfect SEO and Lighthouse scores (optimizing for traffic I don't have yet). Note: Until last week I had never heard of Lighthouse scores.

So we picked the "Modern Minimalist" stack:

* **Astro:** What intrigued me is that it generates static HTML as much as possible, only using JavaScript for any dynamic elements.
* **Tailwind CSS:** Because Gemini suggested this, and I had zero context for picking a different framework.
* **Cloudflare Pages:** This part I actually understood - hosting on the Edge closer to the user, rather than a centralized "origin" server.

## Man vs. Machine: The Architecture Battle

The workflow was fascinating. I would take screenshots of the in-progress web pages, describe what changes I wanted (e.g. "I want the text to pop more when I mouse-hover over it"), and the AI would spit out Tailwind classes like `transition-colors duration-300 hover:text-white`. It saved me an immeasurable amount of time navigating the Astro framework and Tailwind utility classes. By the end of the day, I was even starting to understand what some of this meant, and recognizing patterns.

**However, the intelligence is still artificial.**

There were some amusing examples of the AI getting a completely wrong idea. For example, I wanted to add a "Pre-save Now" badge to the card for *Mist & Mushrooms* on the music list page.

**The AI's First Idea:** It forgot that there would be more music in the future (or maybe it's prescient), and added the code directly onto the page. I had to remind it that I would (hopefully) compose more songs in the future.

**The AI's Second Idea:**  Hard-code a check inside the loop to look for my song: `if (song.title === "Mist & Mushrooms") showBadge()`. Again, I explained that I would have to edit this for every new track release.

I directed the AI to update the data schema instead, adding `badge` and `actionText` attributes to the individual Markdown files, and we finally had the solution I wanted. This was pretty interesting to me. I would say the AI had a pretty solid understanding of the Astro framework and CSS (maybe even advanced, I'm really not qualified to judge), but a very entry-level grasp of software design.

## Design

I also learned that design is hard. I could tell when I didn't like how something looked, but I had no idea how to fix any of it. Thankfully, my wife is an excellent graphic designer, and I relied on her feedback a lot to guide the look and feel.

## Deployment

Once I had it working locally the way I wanted, deployment was pretty easy. I pushed the code to my GitHub repository, hooked that up to **Cloudflare Pages**, and pretty soon I had a working website, with the DNS routed correctly for email.

## The Result

I started the project on Sunday morning. The site was live by Monday night. Everything works (I think), and it looks way better than I expected. The infrastructure is ready for millions of fans.

Now I just need the fans. And figure out dark mode on mobile.