---
layout: post
title: >
    Designer material: Beef belly
date:   2023-10-08 19:30:00
description: Organic material experiments made in Substance Designer.
tags: material substance designer
categories: art
thumbnail: assets/img/posts/2023-10-08-designer-material-beef-belly-3.jpg
---
## Result

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/posts/2023-10-08-designer-material-beef-belly-0.png" class="img-fluid rounded z-depth-1" zoomable=true %}
    </div>
</div>
<div class="caption">
    Beef belly material made in Substance Designer.
</div>

---

## Background

Using Adobe Substance Designer current latest version as of 2023/10/08.

Lately I've been feeling my guts and innards more than ever. So I decided to look on Google and ArtStation for some materials that depict organs and tissues but in a edible way, not only for zombie games.

Then I came with the idea of recreating some raw ingredients used in Mexican *cuisine* mainly in form of [soups](https://en.wikipedia.org/wiki/Menudo_(soup)) or [tacos](https://en.wikipedia.org/wiki/Tripas).

<blockquote class="tiktok-embed" cite="https://www.tiktok.com/@lapinaenlacocina/video/6997771637558889734" data-video-id="6997771637558889734" style="max-width: 605px;min-width: 325px;" > <section> <a target="_blank" title="@lapinaenlacocina" href="https://www.tiktok.com/@lapinaenlacocina?refer=embed">@lapinaenlacocina</a> Menudo, Pancita De Res <a title="menudo" target="_blank" href="https://www.tiktok.com/tag/menudo?refer=embed">#menudo</a> <a title="pancitaderes" target="_blank" href="https://www.tiktok.com/tag/pancitaderes?refer=embed">#pancitaderes</a> <a title="mexicanrecipes" target="_blank" href="https://www.tiktok.com/tag/mexicanrecipes?refer=embed">#mexicanrecipes</a> <a title="paralacruda" target="_blank" href="https://www.tiktok.com/tag/paralacruda?refer=embed">#paralacruda</a> <a title="foryoupage" target="_blank" href="https://www.tiktok.com/tag/foryoupage?refer=embed">#foryoupage</a> <a title="momsrecipe" target="_blank" href="https://www.tiktok.com/tag/momsrecipe?refer=embed">#momsrecipe</a> <a title="oreganodehigueras" target="_blank" href="https://www.tiktok.com/tag/oreganodehigueras?refer=embed">#oreganodehigueras</a> <a target="_blank" title="♬ 80&#39;s quiet and dreamy synth pop - Gloveity" href="https://www.tiktok.com/music/80's-quiet-and-dreamy-synth-pop-6817311978390833153?refer=embed">♬ 80&#39;s quiet and dreamy synth pop - Gloveity</a> </section> </blockquote> <script async src="https://www.tiktok.com/embed.js"></script>

Have to mention that I feel really attracted to organic objects and textures with geometrical or fractal shapes. So the first choice is the tasteful beef belly.

## Procedure

First of all, we need to gather some visual references from the web to figure out how material should behave with lighting. As for the touch, I remember a gummy-like feeling and quite elastic with nice bouncing. I'll never forget the feel and taste in my mouth, it is usually cooked with a spicy broth, but I'll focus con raw version of this tissue material.

Following images were arranged inside PureRef to be easily seen when using any content creation tool such as Substance Designer or Photoshop.

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/posts/2023-10-08-designer-material-beef-belly-1.jpg" class="img-fluid rounded z-depth-1" zoomable=true %}
    </div>
</div>
<div class="caption">
    Reference images arranged using PureRef.
</div>

Alright! This should be easy using a geometrical node and the most suitable one is the Voronoi Fractal with some specific tunning to recreate tissue pattern. Further filtering and processing was required to use same pattern as for color, normal, displacement, surface scattering and anywhere needed to give material the most realistic feel.

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/posts/2023-10-08-designer-material-beef-belly-2.png" class="img-fluid rounded z-depth-1" zoomable=true %}
    </div>
</div>
<div class="caption">
    Node network in Substance Designer based mainly on root <b>Voronoi Fractal</b> node.
</div>

## Conclusion

Normal and height map where used for displacement. It is maxed at its most for give it the sense of depth. We can call it a day for now, having a nice medium-distance effect for the material with current displacement configuration. Further improvements could apply when I get some experience using Designer. 

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/posts/2023-10-08-designer-material-beef-belly-3.jpg" class="img-fluid rounded z-depth-1" zoomable=true %}
    </div>
     <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/posts/2023-10-08-designer-material-beef-belly-0.png" class="img-fluid rounded z-depth-1" zoomable=true %}
    </div>
</div>
<div class="caption">
    Current material state rasterized with on IRay and OpenGL renderers respectively.
</div>

Happy creations! 

Thanks for reading :blush:


