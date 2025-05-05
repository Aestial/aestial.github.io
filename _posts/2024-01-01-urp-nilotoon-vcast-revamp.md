---
layout: post
title:  VCast revamp with URP and Nilo toon shader
date:   2024-01-01 16:20:00
description: Using a neat URP code shader (no Visual nodes) for anime-like cartoony characters.
tags: unity vroid urp shaders hlsl
categories: shaders
thumbnail: assets/img/posts/2024-01-01-urp-nilotoon-vcast-revamp.gif

---

> Despite the popularity of visual nodes shader authoring in Unity, writing shaders is still available for the Universal Render Pipeline. Nilo Toon (creator) is sharing a real cool shader guide for learning the basics on Toon techniques in URP.

## Result

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/posts/2024-01-01-urp-nilotoon-vcast-revamp.gif" class="img-fluid rounded z-depth-1" zoomable=true %}
    </div>
</div>
<div class="caption">
    Animated scene with poses and particles. Featuring Nilo Toon shader.
</div>

## Background

VRM humanoids are a well established standard file format in Japan and it's also used by popular international apps like [VR-Chat](https://hello.vrchat.com/). When I discovered the [VRoid](https://vroid.com/en) ecosystem, I realized it would be easy to make a self-portrait using anime style rather than Pixel art lol. 

## Process

The journey started using [VRoid Studio](https://vroid.com/en/studio) for Mac and I created my own anime avatar in just a few hours (yes, I like being picky). It's neat to see your creation being animated right away ready for a photo shoot session. When your character is ready it is easy to export to the Hub and share with others.

Then I jumped into Unity to see what can [UniVRM plugin](https://github.com/vrm-c/UniVRM) could do out-of-box. I could export to VRM format from VRoid Studio, that is the one plugin reads and transforms it into a ready-to-use prefab. Awesome!

Inside Unity it was easy to setup an environment with lighting, particles and props from [SketchFab](https://sketchfab.com/feed). Then I used some Mixamo animations and tried to adapt them to the VRM skeleton. Some of them worked but with some issues on joints like wrists and ankles. I wish Unity had something like the new Custom Rig in UE5...

## Conclusion

Nilo toon shader replacement for UniVRM shaders is awesome! It just gave a modern and polished look to my previous work on anime characters inside Unity. Please stay tunned for more information about VRM in game engines for different purposes like rendering or games. Cheers to [Genshin Impact](https://genshin.hoyoverse.com/en/) creators!

*Thanks for reading this far, happy creations!* :smiley: