export default {
    title: "",
    description: "UI SDK for Asgardeos/IS",
    themeConfig: {
        logo: "/logo-with-shadow.png",
        siteTitle: "Asgardeo",
        nav: [
            { text: "About", link: "/about" },
            { text: "Contact", link: "/contact" },
            { text: "Guide", link: "/guide" },
            { text: "Configs", link: "/configs" },
            { text: "Changelog", link: "https://github.com/Evavic44" },
          ],
    sidebar: [
        {
        text: "UI SDK",
        collapsible: true,
        items: [
            { text: "Introduction", link: "/introduction" },
            { text: "Getting Started", link: "/getting-started" },
        ],
        },
        {
        text: "JS-UI-CORE",
        collapsible: false,
        items: [
            { text: "Introduction", link: "/introduction" },
            { text: "Getting Started", link: "/getting-started" },
        ],
        },
        {
        text: "REACT-UI",
        collapsible: true,
        items: [
            { text: "Introduction", link: "/introduction" },
            { text: "Getting Started", link: "/getting-started" },
        ],
        },
    ],
      },
  };

  