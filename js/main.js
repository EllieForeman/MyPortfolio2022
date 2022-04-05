gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(MorphSVGPlugin);

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

// ------- Morph Blob on scroll -------
// const wave = document.getElementById("wave1");
// const header = document.getElementById("svg-blob");

// const tl = gsap.timeline({
//     scrollTrigger: {
//         trigger: header,
//         start: 'top bottom',
//         end: "+=1000", // end is after scrolling 3000px from start - speed of animation
//         scrub: 1,
//         // invalidateOnRefresh: true,
//         markers: true
//     },
// });


// tl.to(wave, {morphSVG:"#wave2"});

//Get all logo blobs
const logoBlobs = gsap.utils.toArray(".logo-blob");


//Loop logo blobs to assign animation to each one
logoBlobs.forEach((blob) => {
    // get the path data from all the shapes and put them into an Array
    const shapes = gsap.utils.toArray(".blob").map(el => el.getAttribute("d"));
    // create a function that randomly grabs one of the path data strings from the Array
    const getRandomShape = gsap.utils.random(shapes, true);

    gsap.to(blob.querySelector('.rds-grad-cls-1'), {
        morphSVG: getRandomShape,
        repeat: -1,
        repeatRefresh: true, 
        duration: 10,
        ease: "power2.inOut"
    });

});
