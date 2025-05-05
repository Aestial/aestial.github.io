---
layout: post
title: >
    TikTok Effect House: Buddha in the Sky
date:   2023-09-30 15:30:00
description: Using TikTok's Effect House for creating an sky segmentation effect featuring a huge Buddha head.
tags: TikTok effect buddha head
categories: ar-effects
thumbnail: assets/img/posts/2023-09-30-tiktok-effect-buddha-in-sky.jpg
---

## Result

<div class="row justify-content-center mt-3">
    <a class="btn btn-lg btn-block" href="https://vm.tiktok.com/ZMjKgGoKn/" role="button" target="_blank">Try now on TikTok!</a>
</div>

<blockquote class="tiktok-embed" cite="https://www.tiktok.com/@kusheesh/video/7286554333880028422" data-video-id="7286554333880028422" style="max-width: 605px;min-width: 325px;" data-autoplay="false" muted> <section> <a target="_blank" title="@kusheesh" href="https://www.tiktok.com/@kusheesh?refer=embed">@kusheesh</a> God Buddha head seen above buildings. 30th street station <a title="buddha" target="_blank" href="https://www.tiktok.com/tag/buddha?refer=embed">#buddha</a> <a title="gods" target="_blank" href="https://www.tiktok.com/tag/gods?refer=embed">#gods</a> <a title="extraordinary" target="_blank" href="https://www.tiktok.com/tag/extraordinary?refer=embed">#extraordinary</a> <a target="_blank" title="♬ Buddham Saranam Gacchami - Lalitya Munshaw" href="https://www.tiktok.com/music/Buddham-Saranam-Gacchami-6714343013839013890?refer=embed">♬ Buddham Saranam Gacchami - Lalitya Munshaw</a> </section> </blockquote> <script async src="https://www.tiktok.com/embed.js"></script>
<div class="caption">
    Actual effect story video from TikTok app.
</div>

#### [View on GitHub](https://github.com/Aestial/TikTok-BuddhaInTheSky)

<!-- Star on GitHub button -->
<iframe src="https://ghbtns.com/github-btn.html?user=Aestial&repo=TikTok-BuddhaInTheSky&type=star&count=true&size=large" frameborder="0" scrolling="0" width="180" height="30" title="GitHub"></iframe>

---

## Background
A former colleague ask me to test TikTok's Sky Segmentation (SS) right away for marketing purposes. They want to display some huge objects on top of some specific building, all rendered just in the sky avoiding other buildings and trees, through an Augmented Reality (AR) camera effect.

Let's take a look at what others have done so far. First hit on Google was *the always helpful* [Emiliusvgs](https://www.patreon.com/emiliusvgs) spanish tutorial on Sky Segmentation effects. Thanks again Emilio!

<div>
    <style>
        .embed-container {
            position: relative;
            padding-bottom: 56.25%;
            height: 0;
            overflow: hidden;
            max-width: 100%;
        }
        .embed-container iframe,
        .embed-container object,
        .embed-container embed {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
        }
    </style>
    <div class='embed-container'>
        <iframe src='https://www.youtube.com/embed/IPxOqc6bXqU' frameborder='0'
                allowfullscreen></iframe>
    </div>
</div>
<div class="caption">
    Emiliusvgs spanish tutorial on Sky Segmentation effects. It has English subtitles and a great recommendation for generative AI Skyboxes.
</div>

## Approach
To create TikTok AR effects and filters, we need to use Effect House (EH). It has never been so easy because EH has several templates that have been updated continuously, side by side with each Effect House software update. Following Emiliusvgs tutorial I'll be using the latest available Sky Segmentation template.

Template features a castle in the sky laying over a piece of ground that took off from land and is now floating in the sky with (of course) some particles to enhance the sense of pandemonium. Existing particles are a perfect match for this effect purpose. A full sky replacement is featured in template, meaning that a fully opaque skybox image is overlay when sky detected. This is a cool Sky Segmentation use case but I really want it to be as seamless as possible with most of current sky seen on video feed with a subtle transparency blending. 

To achieve such sky blending I started using an AI *skybox* generator called [Blockade Labs](https://skybox.blockadelabs.com/), as Emiliusvgs suggested. It is known for its excellent results taking a simple prompt and delivering a full resolution cubemap texture ready to use in games and, like in this particular case, AR effects. Also I used a blend option for just tinting the real sky exactly where I want it: around Buddha's head. It is an overlay, so I just needed some additive blending in the material and voila!

<div class="row justify-content-center mt-3">
    <div class="col-sm-7 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/posts/2023-09-30-tiktok-effect-buddha-in-sky.jpg" class="img-fluid rounded z-depth-1" zoomable=true %}
    </div>
</div>
<div class="caption">
    Effect preview captured using Effect House.
</div>

Buddha head 3D model is free for commercial and personal uses, it has the Creative Commons CC0 license. You can find more information about model, available to download at [SketchFab](https://sketchfab.com/)

<div>
    <style>
        .embed-container {
            position: relative;
            padding-bottom: 56.25%;
            height: 0;
            overflow: hidden;
            max-width: 100%;
        }
        .embed-container iframe,
        .embed-container object,
        .embed-container embed {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
        }
    </style>
    <div class='embed-container'>
        <iframe title="Head of the Buddha, 12th - 13th C CE" frameborder="0" allowfullscreen mozallowfullscreen="true" webkitallowfullscreen="true" allow="autoplay; fullscreen; xr-spatial-tracking" xr-spatial-tracking execution-while-out-of-viewport execution-while-not-rendered web-share src="https://sketchfab.com/models/d1963b3475e24071b338b1ca782f4d82/embed">
        </iframe>
    </div>
</div>
<div class="caption">
    Sandstone Khmer Head of the Buddha, 12th, 13th C CE, now in the collection of the Minneapolis Institute of Art. 
</div>

> :eyes: **Be aware!**
> 
> TikTok is asking creators wether they are heavily using  assets created through generative AI models for effects.

So I don't want to be tagged for using too much generative content. Skybox generation is ok, but other assets were either provided by TikTok itself or downloaded from SketchFab.


*Thanks for reading, and happy creations!!!* :smiley: