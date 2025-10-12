const lazyImages = document.querySelectorAll('img[data-src]');


const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src; 
      img.onload = () => img.classList.add('loaded'); 
      observer.unobserve(img); 
    }
  });
}, {
  root: null,       
  rootMargin: "1000px",
  threshold: 0.1     
})

lazyImages.forEach(img => observer.observe(img));
