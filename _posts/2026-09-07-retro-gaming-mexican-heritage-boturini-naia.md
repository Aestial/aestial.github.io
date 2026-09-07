---
layout: post
title: "Preserving History in 8 Bits: From Boturini to NAIA with Tamal Rosita"
date: 2026-09-07 12:00:00 -0600
description: "Reflecting on developing El Tesoro de Boturini and NAIA for INAH & Mermelada de Juegos, team consolidation with CaffeineWorks & Teatro Contacto, and exhibiting retro Game Boy games at MNAH, Castillo de Chapultepec, and CCD."
tags: mexico gb-studio retro game-jam inah tamal-rosita
categories: game dev
thumbnail: assets/img/posts/2026-09-07-naia-boturini.gif
---

> There is something genuinely magical about watching someone's eyes light up when they hold a Game Boy in a museum hall. In an era dominated by hyper-realistic graphics and infinite notifications, the 8-bit aesthetic cuts straight through the noise to pure, unfiltered wonder.

Over the past two years, our journey developing games for the **Mini Game Work Jam (MGWJ)**—organized by the **Instituto Nacional de Antropología e Historia (INAH)** and **Mermelada de Juegos**—has been one of the most rewarding creative adventures of our lives. 

What started as an exploration of historical codices in 2025 with [**El Tesoro de Boturini**](https://tamalrosita.itch.io/el-tesoro-de-boturini) evolved in 2026 into a prehistoric underwater archaeological odyssey in [**NAIA**](https://tamalrosita.itch.io/naia). Along the way, it marked the official consolidation of team **Tamal Rosita**, joining forces with **CaffeineWorks (Ricardo Lázaro)** and **Teatro Contacto (Seb Porthoz)**, and culminated in taking our retro cartridges into some of Mexico's most sacred cultural institutions: the **Museo Nacional de Antropología**, the **Castillo de Chapultepec**, and the **Centro de Cultura Digital**.

Here is the story behind both games, the magic of retro nostalgia, and why 8-bit handhelds belong in museums.

---

## The Irresistible Pull of Retro Nostalgia

Why make games for a handheld console released in 1989?

Nostalgia is a powerful emotional conduit. Modern video games are extraordinary technical achievements, but they often come with steep learning curves: dual analog sticks, dozens of button combinations, cinematic tutorials, and gigabytes of downloads. 

A Game Boy game, by contrast, possesses **radical immediacy**:
- **A 160×144 pixel canvas** where every sprite must convey personality with surgical precision.
- **A 4-shade monochrome palette** that relies on high-contrast readability and imagination.
- **A D-Pad, A, and B buttons**—an interface so universal that a 6-year-old child and a 70-year-old grandparent can understand it instantly.
- **Chiptune soundscapes** that evoke warm memories of afternoon sessions spent huddled by a lamp.

When you fuse that nostalgic intimacy with real Mexican history and archaeology, something extraordinary happens. History ceases to be an abstract wall of academic text behind glass; it transforms into an interactive mystery you can hold in your hands.

---

## 2025: *El Tesoro de Boturini* – Restoring Codices Through Picross

<div class="row justify-content-center mt-3 mb-3">
    <div class="col-sm-8 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/projects/el-tesoro-de-boturini/TDB_Box&Cartridge.png" class="img-fluid rounded z-depth-1" zoomable=true %}
    </div>
</div>
<div class="caption text-center">
    Box and cartridge render for El Tesoro de Boturini.
</div>

The 2025 Mini Game Work Jam arrived with a compelling challenge: **Conservación de Patrimonio Documental** (Documentary Heritage Preservation), with the secret theme centering on the **Biblioteca Nacional de Antropología e Historia (BNAH)**.

Inspired by the historic [Boturini Codex (Tira de la Peregrinación)](https://www.bnah.inah.gob.mx/)—an ancient pictorial manuscript tracing the Mexica people's migration from Aztlán to the Valley of Mexico—we wanted to design a game that respected the painstaking, delicate discipline of document conservation.

In *El Tesoro de Boturini*, players step into the shoes of **Dani**, a game jammer at the BNAH who gets recruited into an unexpected mission: helping recover and restore lost historical folios. Joined by the fan-favorite **Agente00Cheemte**, Dani navigates the library's archives, solving nonogram (Picross) logic puzzles. 

### Why Nonograms?
Nonograms mirror the patient logic of paper restoration: you begin with a blank grid and numerical clues, carefully deducting what belongs and what doesn't, gradually unveiling an intact historical image. 

<div>
    <style>
        .itch-widget-container {
            display: block;
            margin-left: auto;
            margin-right: auto;
            position: relative;
            padding-bottom: 173px;
            height: 0;
            overflow: hidden;
            max-width: 558px;
        }
        .itch-widget-container iframe,
        .itch-widget-container object,
        .itch-widget-container embed {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
        }
    </style>
    <div class='itch-widget-container'>
        <iframe frameborder="0" src="https://itch.io/embed/3715892?border_width=2&amp;bg_color=071821&amp;fg_color=e0f8cf&amp;link_color=86c06c&amp;border_color=e0f8cf" width="554" height="169"><a href="https://tamalrosita.itch.io/el-tesoro-de-boturini">El Tesoro de Boturini by Tamal Rosita</a></iframe>
    </div>
</div>

Built from the ground up using **GB Studio**, Aseprite, and Tiled, the game was released as 100% open-source software under the [CC0 license on GitHub](https://github.com/Aestial/MGWJ-2025_El-Tesoro-de-Boturini).

---

## 2026: *NAIA* – Subaquatic Archaeology in the Late Pleistocene

<div class="row justify-content-center mt-3 mb-3">
    <div class="col-sm-8 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/projects/naia/NAIA_Cover.jpg" class="img-fluid rounded z-depth-1" zoomable=true %}
    </div>
</div>
<div class="caption text-center">
    NAIA: A prehistoric adventure in the Yucatán Peninsula for the Game Boy.
</div>

One year later, the Mini Game Work Jam 2026 presented an even deeper theme: **Conservación del Patrimonio Subacuático** (Underwater Cultural Heritage Preservation).

We immediately looked to one of the most astonishing scientific discoveries in modern Mexican archaeology: **Naia**, the nearly complete skeleton of a young woman dating back 12,000 to 13,000 years into the Late Pleistocene. Her remains were discovered deep inside **Hoyo Negro**, a submerged chamber in the Sac Actun cenote cave system in Quintana Roo, alongside prehistoric megafauna like saber-toothed cats, gomphotheres, and giant ground sloths.

*NAIA* puts players right into that ancient landscape before the ice age ended and the caves became flooded. It reimagines the prehistoric Yucatán Peninsula as an expansive 8-bit top-down RPG adventure:

<div class="row justify-content-center mt-3 mb-3">
    <div class="col-sm-8 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/projects/naia/NAIA_Combat.png" class="img-fluid rounded z-depth-1" zoomable=true %}
    </div>
</div>
<div class="caption text-center">
    Turn-based tactical combat running on Game Boy hardware inside GB Studio.
</div>

### Technical Evolution
For *NAIA*, we pushed GB Studio far beyond what we had done with *Boturini*:
- **Turn-Based Combat System**: Integrated a tactical turn-based battle plugin, allowing players to confront Pleistocene creatures and overcome prehistoric trials.
- **Caves & Cenotes Exploration**: Custom tilemaps and labyrinthine caves created in Aseprite and Tiled, capturing the eerie mystique of the Yucatán karst system.
- **Environmental Storytelling**: Weaving INAH's underwater archaeology guidelines into mechanics—teaching players how delicate underwater environments are and why submerged artifacts must be safeguarded.

<div class='itch-widget-container'>
    <iframe frameborder="0" src="https://itch.io/embed/4610605?border_width=2&amp;bg_color=071821&amp;fg_color=e0f8cf&amp;link_color=86c06c&amp;border_color=e0f8cf" width="554" height="169"><a href="https://tamalrosita.itch.io/naia">NAIA by Tamal Rosita</a></iframe>
</div>

Like its predecessor, *NAIA* is proudly open-source under the MIT license, with code and assets available on the [Tamal Rosita GitHub repository](https://github.com/Tamal-Rosita/MGWJ2026-NAIA).

---

## Consolidating Team Tamal Rosita

One of the greatest milestones of this two-year cycle was the growth and consolidation of **Tamal Rosita**. 

What began as an independent playground for experimental mechanics founded with my wife [Sakbé Corona](https://dori.science) found new wings through our collaboration with two powerhouse partners in the Mexican independent scene:

- **CaffeineWorks (Ricardo Lázaro)**: Bringing razor-sharp visual direction, meticulous sprite work, and an innate sense of atmosphere that makes every screen in *NAIA* pop with life.
- **Teatro Contacto (Seb Porthoz)**: Infusing the projects with rich narrative design, theatrical pacing, immersive dialogue, and evocative chiptune compositions that honor authentic Game Boy hardware constraints.

Uniting **Jaime Hernández (Aestial)** on systems programming and GB Studio architecture with Ricardo’s visual artistry and Seb’s narrative and acoustic worldbuilding created an effortless synergy. Tamal Rosita has grown into a versatile creative collective dedicated to proving that retro constraints can host deeply meaningful cultural experiences.

---

## Taking 8-Bit Heritage to Public Spaces

Publishing on itch.io is fantastic, but taking these games out of the digital ether and setting them up in public spaces was where the true magic happened.

We had the privilege of showcasing *El Tesoro de Boturini* and *NAIA* in three of Mexico City's most iconic venues:

### 1. Museo Nacional de Antropología (MNA)
Setting up a showcase station inside the **Museo Nacional de Antropología** was surreal. Visitors who were just standing inches away from real pre-Columbian codices and ancient artifacts walked over to our table, picked up a handheld Game Boy running our ROMs, and immediately started playing. 

Children who might have felt fatigued after walking through expansive museum wings suddenly had their curiosities re-ignited. They wanted to know: *"Is the Boturini Codex real? Can I see it in the library next door?"* That is the bridge game jams can build.

### 2. Castillo de Chapultepec (Museo Nacional de Historia)
High above the city, amidst the stone corridors and gardens of Chapultepec Castle, we set up interactive stations for museum-goers of all walks of life. 

Here, the nostalgia factor hit its emotional zenith:
- **Parents and teenagers**: Parents would stop dead in their tracks upon spotting the DMG console, grab their teenagers by the shoulder, and say with a grin, *"Look! That was my console back in the 90s!"*
- **Passing the torch**: Watching a mother explain how the D-pad and B-button worked to her child—and then watching that child solve an archival restoration puzzle—was pure poetry. Nostalgia transformed into intergenerational connection.

### 3. Centro de Cultura Digital (CCD)
Underneath the Estela de Luz, the **Centro de Cultura Digital** represents the beating heart of Mexico's digital art and game development scene. Showcasing alongside fellow game developers, artists, and researchers from **Mermelada de Juegos** and INAH created a passionate forum. We discussed technical pipeline tricks, GB Studio memory limits, and how government and cultural institutions can partner with indie developers to foster interactive preservation.

---

## Reflections & Looking Forward

When you build for vintage hardware, you realize that limitations are not walls; they are guardrails that steer you toward pure design clarity. 

You cannot hide behind motion blur, high-resolution textures, or lengthy cutscenes. If the core loop isn’t engaging, the game simply fails. But when you couple that mechanical purity with a genuine passion for cultural heritage, games become something rare: accessible, educational, and genuinely delightful.

A massive thank you to **INAH**, **Mermelada de Juegos**, the **Biblioteca Nacional de Antropología e Historia**, our wonderful teammates **Ricardo Lázaro (CaffeineWorks)** and **Seb Porthoz (Teatro Contacto)**, and every single person who stopped by our tables to play, smile, and reminisce.

### Play the Games & Check Out the Code:
- 🎮 **El Tesoro de Boturini (2025)**: [Play on itch.io](https://tamalrosita.itch.io/el-tesoro-de-boturini) | [GitHub Repository](https://github.com/Aestial/MGWJ-2025_El-Tesoro-de-Boturini)
- 🦕 **NAIA (2026)**: [Play on itch.io](https://tamalrosita.itch.io/naia) | [GitHub Repository](https://github.com/Tamal-Rosita/MGWJ2026-NAIA)

**Long live retro gaming, long live cultural preservation, and we :heart: FOSS!**
