const lazyImages = document.querySelectorAll('img[data-src]');
const lazyArray = Array.from(lazyImages);


const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      // determine a small stagger based on the image index so they slide in one-by-one
      const index = lazyArray.indexOf(img);
      const delay = Math.min(index * 120, 600); // cap delay to 600ms
      img.style.transitionDelay = `${delay}ms`;

      img.src = img.dataset.src;
      img.onload = () => {
        img.classList.add('show');
        // clear inline delay after animation so it doesn't affect future style changes
        setTimeout(() => { img.style.transitionDelay = ''; }, 800 + delay);
      };

      observer.unobserve(img);
    }
  });
}, {
  root: null,
  rootMargin: "1000px",
  threshold: 0.1
})

lazyImages.forEach(img => observer.observe(img));
