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

// PORTFOLIO PAGE
const allLinks = gsap.utils.toArray('.portfolio__categories a');
const pageBackground = document.querySelector('.fill-background');
const largeImage = document.querySelector('.portfolio__image--l');
const smallImage = document.querySelector('.portfolio__image--s');
const lInside = document.querySelector('.portfolio__image--l .image_inside');
const sInside = document.querySelector('.portfolio__image--s .image_inside');
 
function initPortfolioHover() {
    allLinks.forEach(link => {
        link.addEventListener('mouseenter', createPortfolioHover);
        link.addEventListener('mouseleave', createPortfolioHover);
        link.addEventListener('mousemove', createPortfolioMove);
    });
}
 
function createPortfolioHover(e){
 
    if(e.type === 'mouseenter'){
        const { color, imagelarge, imagesmall } = e.target.dataset;
        const allSiblings = allLinks.filter(item => item !== e.target)
        const tl = gsap.timeline();
        tl
            .set(lInside, { backgroundImage: `url(${imagelarge})`})
            .set(sInside, { backgroundImage: `url(${imagesmall})`})
            .to([largeImage, smallImage], {duration: 1, autoAlpha: 1})
            .to(allSiblings, {color: '#F76354', autoAlpha: 0.2}, 0)
            .to(e.target, {color: '#F76354', autoAlpha: 1}, 0)
            // .to(pageBackground, {backgroundColor: color, ease: 0}, 0); // change background colour on hover
    } else if(e.type === 'mouseleave'){
        const tl = gsap.timeline();
        tl
            .to([largeImage, smallImage], {duration: 1, autoAlpha: 0})
            .to([allLinks], {color: '#F76354', autoAlpha: 1}, 0)
        // fade out images
        // all links back to black
        // change background color back to default #ACB7AE
 
    }
 
}

function createPortfolioMove(e){
    const { clientY } = e;
    gsap.to(largeImage, {
        duration: 1.2,
        y: moveHeight(clientY)/7,
        ease: 'Power3.inOut'
    })
    gsap.to(smallImage, {
        duration: 1.5,
        y: moveHeight(clientY)/3,
        ease: 'Power3.inOut'
    })
}

function moveHeight(clientY) {
    return -(document.querySelector('.portfolio__categories').clientHeight - clientY);
}

function init(){
     
    initPortfolioHover();
 
}
 
window.addEventListener('load', function(){
    init();
});