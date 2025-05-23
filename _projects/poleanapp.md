---
layout: page
title: Poleanapp
description: Ludo-like tabletop simulator
img: assets/img/projects/poleanapp/Poleanapp.jpg
importance: 1
category: fun
---

> Everybody should build their own Poleana board, so I did it in Unreal...

## Result

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
        <iframe src="//www.youtube.com/embed/p65aSIYT8js" allowfullscreen="" frameborder="0"></iframe>
    </div>
</div>
<div class="caption">
    Poleanapp gameplay
</div>

#### [View on GitHub](https://github.com/Aestial/Poleanapp)

<!-- Star on GitHub button -->
<iframe src="https://ghbtns.com/github-btn.html?user=Aestial&repo=Poleanapp&type=star&count=true&size=large" frameborder="0" scrolling="0" width="180" height="30" title="GitHub"></iframe>

---

## About

Poleanapp is based in a Mexican ludo-like board game called [Poleana](https://gatopardo.com/estilo-de-vida/poleana-el-juego-de-mesa-de-la-carcel/) and this board simulator is made using Unreal Engine 4.

This simulator is programmed using Blueprints only. It tries to replicate real board, chips, dices and turns. Both meshes of the board and dices were modeled and "textured" inside Unreal. Some other assets from Epic templates were used.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/projects/poleanapp/Poleanapp-SS01.jpg" title="Dice physics" class="img-fluid rounded z-depth-1" zoomable=true %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/projects/poleanapp/Poleanapp.jpg" title="example image" class="img-fluid rounded z-depth-1" zoomable=true %}
    </div>
</div>
<div class="caption">
    Two beauty shots. On the left, dice throw simulation: physics simulated dice rolling. Right, a lucky one, 6 and 3 takes you off! Dice number indicator and depth of field camera effect.
</div>
