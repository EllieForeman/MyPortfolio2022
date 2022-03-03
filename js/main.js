gsap.registerPlugin(ScrollTrigger);

let sections = gsap.utils.toArray(".panel");

let scrollTween = gsap.to(sections, {
    xPercent: -100 * (sections.length - 1),
    ease: "none", 
    scrollTrigger: {
      trigger: ".container",
      pin: true, // pin else animation moves sideways
      scrub: 0.1, // time between animation and scrollbar
      markers: true, 
      end: "+=3000" // end is after scrolling 3000px from start - speed of animation
    }
  });