gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(MorphSVGPlugin);

const wideScreen = window.matchMedia("(min-width: 800px)");
const narrowScreen = window.matchMedia("(max-width: 799px)");

ScrollTrigger.matchMedia({
    "(min-width: 800px)": function() {
        // ------- Horizontal scroll -------
        let sections = gsap.utils.toArray(".panel");

        let scrollTween = gsap.to(sections, {
            xPercent: -100 * (sections.length - 1),
            ease: "none", 
            scrollTrigger: {
            trigger: ".container",
            pin: true, // pin else animation moves sideways
            scrub: 0.1, // time between animation and scrollbar
            end: "+=3000" // end is after scrolling 3000px from start - speed of animation
            }
        });

        // ------- Box Movement -------
        gsap.set(".box-1", {y: 100});
        // ScrollTrigger.defaults({markers: {startColor: "white", endColor: "white"}});

        // red section
        gsap.to(".box-1", {
            y: -130,
            duration: 2,
            ease: "elastic",
            scrollTrigger: {
                trigger: ".box-1",
                containerAnimation: scrollTween,
                start: "left center",
                toggleActions: "play none none reset",
                id: "1",
            }
        });

    }
});

//Get all logo blobs
const logoBlobs = gsap.utils.toArray(".logo-blob");


//Loop logo blobs to assign animation to each one
logoBlobs.forEach((blob) => {
    console.log(blob)
    // get the path data from all the shapes and put them into an Array
    const shapes = gsap.utils.toArray(".blob").map(el => el.getAttribute("d"));
    // Returns a reusable function that randomly gets one of the path data strings from the Array
    const getRandomShape = gsap.utils.random(shapes, true);
    // Returns a reusable function that returns a random value between 0 - 2
    const delay = gsap.utils.random(0, 2, true);
    gsap.to(blob.querySelector('.gradient'), {
        morphSVG: getRandomShape,
        delay: delay,
        repeat: -1,
        repeatRefresh: true, 
        repeatDelay: 0,
        duration: 5
    });
});
