// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-about",
    title: "about",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-blog",
          title: "blog",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/blog/";
          },
        },{id: "nav-publications",
          title: "publications",
          description: "List of publications by year, mostly related to Autonomous Vehicles, Driving Education, Mixed Reality, Simulation and Urban Planning.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/publications/";
          },
        },{id: "nav-projects",
          title: "projects",
          description: "Projects across multiple scopes and teams.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/projects/";
          },
        },{id: "nav-repositories",
          title: "repositories",
          description: "GitHub is my predilection for repository storage and lately, DevOps. This section is related to my GH profile and curated repositories.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/repositories/";
          },
        },{id: "nav-cv",
          title: "cv",
          description: "Updated resume available in web and PDF.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/cv/";
          },
        },{id: "post-mgwj-2025-el-tesoro-de-boturini",
        
          title: "MGWJ 2025 - El Tesoro de Boturini",
        
        description: "Creating a nonogram GB Studio game for the Mini Game Work Jam 2025.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/nonogram-gb-studio-game/";
          
        },
      },{id: "post-ggj-2024-dope-me-laugh",
        
          title: "GGJ 2024 - Dope me Laugh!",
        
        description: "Our participation in the Global Gam Jam 2024 with the theme &quot;Make me Laugh&quot;.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2024/ggj-2024-dope-me-laugh/";
          
        },
      },{id: "post-vcast-revamp-with-urp-and-nilo-toon-shader",
        
          title: "VCast revamp with URP and Nilo toon shader",
        
        description: "Using a neat URP code shader (no Visual nodes) for anime-like cartoony characters.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2024/urp-nilotoon-vcast-revamp/";
          
        },
      },{id: "post-custom-epic-metahuman-animation-in-ue5",
        
          title: "Custom Epic MetaHuman animation in UE5",
        
        description: "Animation of a custom MetaHuman character using UE5 template.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2023/custom-metahuman-animation/";
          
        },
      },{id: "post-updating-portfolio-website",
        
          title: "Updating portfolio website",
        
        description: "Experience updating personal portfolio website, the lazy way.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2023/updating-portfolio/";
          
        },
      },{id: "post-designer-material-beef-belly",
        
          title: "Designer material: Beef belly",
        
        description: "Organic material experiments made in Substance Designer.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2023/designer-material-beef-belly/";
          
        },
      },{id: "post-tiktok-effect-house-buddha-in-the-sky",
        
          title: "TikTok Effect House: Buddha in the Sky",
        
        description: "Using TikTok&#39;s Effect House for creating an sky segmentation effect featuring a huge Buddha head.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2023/tiktok-effect-buddha-in-sky/";
          
        },
      },{id: "books-the-godfather",
          title: 'The Godfather',
          description: "",
          section: "Books",handler: () => {
              window.location.href = "/books/the_godfather/";
            },},{id: "news-updating-portfolio-and-host-to-github-pages",
          title: 'Updating portfolio and host to GitHub pages',
          description: "",
          section: "News",handler: () => {
              window.location.href = "/news/announcement_2/";
            },},{id: "news-google-analytics-now-available-for-this-website",
          title: 'Google Analytics now available for this website!',
          description: "",
          section: "News",},{id: "news-quot-dope-me-laugh-quot-winner-most-fun-game-pgm-global-game-jam-2024",
          title: '&amp;quot;Dope Me Laugh&amp;quot; winner Most Fun game PGM Global Game Jam 2024!!',
          description: "",
          section: "News",handler: () => {
              window.location.href = "/news/announcement_5/";
            },},{id: "news-mgwj-2025-tema-secreto-la-biblioteca-nacional-de-antropología-e-historia-inah",
          title: 'MGWJ 2025. Tema Secreto: La Biblioteca Nacional de Antropología e Historia (INAH).',
          description: "",
          section: "News",},{id: "projects-boom-destroy-planets",
          title: 'BOOM! Destroy Planets',
          description: "Funny outer space musical memory game",
          section: "Projects",handler: () => {
              window.location.href = "/projects/boom/";
            },},{id: "projects-dope-me-laugh",
          title: 'Dope Me Laugh',
          description: "Mini game for the 2024 Global Game Jam with the theme &quot;Make Me Laugh&quot;.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/dope-me-laugh/";
            },},{id: "projects-dye-my-roots-hex",
          title: 'Dye my Roots HEX',
          description: "Mini game for the 2023 Global Game Jam.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/dye-my-roots-hex/";
            },},{id: "projects-el-tesoro-de-boturini",
          title: 'El Tesoro de Boturini',
          description: "Top-down adventure with nonogram puzzles made with GB Studio.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/el-tesoro-de-boturini/";
            },},{id: "projects-metadrive-xr",
          title: 'Metadrive XR',
          description: "Mixed Reality application for Drivers&#39; Ed",
          section: "Projects",handler: () => {
              window.location.href = "/projects/metadrive-xr/";
            },},{id: "projects-patologico",
          title: 'Patologico',
          description: "SVG super resolution duck character",
          section: "Projects",handler: () => {
              window.location.href = "/projects/patologico/";
            },},{id: "projects-photo-booth-and-wall-gallery",
          title: 'Photo Booth and wall gallery',
          description: "Interactive installation for a Google event in CDMX.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/photobooth/";
            },},{id: "projects-poleanapp",
          title: 'Poleanapp',
          description: "Ludo-like tabletop simulator",
          section: "Projects",handler: () => {
              window.location.href = "/projects/poleanapp/";
            },},{id: "projects-ra-infinitum",
          title: 'RA Infinitum',
          description: "Augmented Reality with image recognition",
          section: "Projects",handler: () => {
              window.location.href = "/projects/ra-infinitum/";
            },},{id: "projects-super-penguin-rescue-64",
          title: 'Super Penguin Rescue 64',
          description: "Rescue baby penguins thrown ungratefully from a cliff...",
          section: "Projects",handler: () => {
              window.location.href = "/projects/spr64/";
            },},{
        id: 'social-discord',
        title: 'Discord',
        section: 'Socials',
        handler: () => {
          window.open("https://discord.com/users/aestial", "_blank");
        },
      },{
        id: 'social-email',
        title: 'email',
        section: 'Socials',
        handler: () => {
          window.open("mailto:%61%65%73%74%69%61%6C@%6D%65.%63%6F%6D", "_blank");
        },
      },{
        id: 'social-github',
        title: 'GitHub',
        section: 'Socials',
        handler: () => {
          window.open("https://github.com/Aestial", "_blank");
        },
      },{
        id: 'social-linkedin',
        title: 'LinkedIn',
        section: 'Socials',
        handler: () => {
          window.open("https://www.linkedin.com/in/Aestial", "_blank");
        },
      },{
        id: 'social-orcid',
        title: 'ORCID',
        section: 'Socials',
        handler: () => {
          window.open("https://orcid.org/0009-0003-5098-188X", "_blank");
        },
      },{
        id: 'social-rss',
        title: 'RSS Feed',
        section: 'Socials',
        handler: () => {
          window.open("/feed.xml", "_blank");
        },
      },{
        id: 'social-stackoverflow',
        title: 'Stackoverflow',
        section: 'Socials',
        handler: () => {
          window.open("https://stackoverflow.com/users/4595374", "_blank");
        },
      },{
        id: 'social-youtube',
        title: 'YouTube',
        section: 'Socials',
        handler: () => {
          window.open("https://youtube.com/@Aestial", "_blank");
        },
      },{
        id: 'social-custom_social',
        title: 'Custom_social',
        section: 'Socials',
        handler: () => {
          window.open("https://aestial.itch.io/", "_blank");
        },
      },{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];
